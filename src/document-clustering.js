import _ from 'underscore';

import Test from './test';
import Text from './text';
import Utils from './utils';


export default class DocumentClustering {
	constructor(corpus, n = 150, rareFirst = true) {
		if (!Utils.isStringArray(corpus)) {
			throw new TypeError('Parameter texts must be an array of strings.');
		}
		/**
		 * Find n the most used words in the corpus to create bag of words
		 */
		const text = Text.normalize(corpus.join(' '));
		this.language = Text.languageDetect(text);
		const words = Text.filterStopwords(Text.wordTokenizer(text), this.language);
		const stemmedWords = words.map(w => (Text.stemmer(w, this.language)));

		const wordCount = Text.wordCounter(stemmedWords);
		const values = _.values(wordCount);
		if (n < values.length) {
			/**
			 * Weights common words heigher if weight === 'common'.
			 * Default is that rare words are more important.
			 */
			if (rareFirst) {
				values.sort((a, b) => {
					return a - b;
				});
			} else {
				values.sort((a, b) => {
					return b - a;
				});
			}
			const pivot = values[n];
			this.words = [];
			_.forEach(wordCount, (value, word) => {
				/**
				 * Add word as long as words is smaller n and the value of the word greater than the pivot.
				 */
				if (value >= pivot && this.words.length < n) {
					this.words.push(word);
				}
			});
		} else {
			this.words = _.unique(stemmedWords);
		}
		this.vectors = [];
		this.ready = this.load(corpus);
	}

	async load(corpus) {
		for (let i in corpus){
			const vector = await Text.createBagOfWords(corpus[i], this.words);
			this.vectors.push(vector);
		}
		return true;
	}

	async findCenters(k) {
		if (await this.ready) {
			const centers = [];
			centers.push(this.vectors[0]);
			for (let i = k - 1; i > 0; i--){
				let maxDistance = 0;
				let bestIndex = -1;
				this.vectors.forEach((vector, index) => {
					const distances = [];
					centers.forEach(center => {
						if (!center) {
							console.log(this.vectors[0]);
							console.log(center);
						}
						distances.push(vector.euclideanDistance(center));
					});
					const meanDistance = Utils.mean(distances);
					if (maxDistance < meanDistance && centers.indexOf(vector) === -1) {
						maxDistance = meanDistance;
						bestIndex = index;
					}
				});
				centers.push(this.vectors[bestIndex]);
			}
			return centers;
		}
	}

	async kNearestNeighbour(k = 5, centers) {
		if (await this.ready) {
			if (!centers) {
				centers = await this.findCenters(k);
			}
			const clusters = [];
			centers.forEach(center => {
				clusters.push([]);
			});
			if (await this.ready) {
				if (!Array.isArray(centers)) {
					centers = await this.findCenters(k)
				}
				this.vectors.forEach(vector => {
					let minDistance = Infinity;
					let bestIndex = -1;
					centers.forEach((center, index) => {
						const distance = vector.euclideanDistance(center);
						if (minDistance > distance) {
							minDistance = distance;
							bestIndex = index;
						}
					});
					clusters[bestIndex].push(vector.label);
				});
				return clusters;
			}
		}
	}

	/**
	 * Tests with training data
	 * @param documents {}: Object with categories that contain arrays of trainingsdata
	 * @returns {Promise.<void>}
	 */
	async test(k = 5, documents) {
		if (await this.ready) {
			const testCorpus = Test.constructCorpus(documents);
			const clusters = await this.kNearestNeighbour(k);
			let corrects = 0;
			let wrongs = 0;
			clusters.forEach(cluster => {
				const categories = [];
				cluster.forEach(document => {
					categories.push(Test.findCategory(document, documents));
				});
				const values = Utils.softmax(_.values(Text.wordCounter(categories)));
				const correct = _.max(values);
				const wrong = Utils.sum(values) - _.max(values);
				corrects += (correct * cluster.length);
				wrongs += (wrong * cluster.length);
			});
			return wrongs / corrects * 100;
		}
	}
}