import _ from 'lodash';

import Test from '../test';
import Text from '../text';
import Utils from '../utils';

import Em from '../algorythm/expectation-maximazation';


export default class DocumentClustering {
	/**
	 *
	 * @param corpus
	 * @param n
	 * @param commonFirst
	 * @param algorythm {EM|KMeans|KNearestNeighbour}
	 */
	constructor(corpus, n = 400, commonFirst = true, Algorythm = Em) {
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
			if (commonFirst) {
				values.sort((a, b) => {
					return b - a;
				});
			} else {
				values.sort((a, b) => {
					return a - b;
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
			this.words = _.uniq(stemmedWords);
		}
		this.vectors = [];
		this.centers = [];
		this.trainingsData = [];
		this.ready = this.load(corpus);
		this.algorythm = new Algorythm();
	}

	train(documents) {
		this.trainingsData = _.cloneDeep(documents);
		this.trained = this.trainAsync(documents);
	}

	async trainAsync(documents) {
		if (await this.ready) {
			this.clusters = await this.cluster(documents);
			this.accuracy = 100 - await this.test(this.clusters, this.trainingsData);
			return true;
		}
	}

	async load(corpus) {
		for (let i in corpus){
			const vector = await Text.createBagOfWords(corpus[i], this.words);
			this.vectors.push(vector);
		}
		return true;
	}

	async cluster(k = 6, iterations = 10) {
		if (!this.algorythm || !this.algorythm.cluster) {
			throw new TypeError('Please supply the algorythm that should be used. Possibilities are: EM, KMeans or KNearestNeighbour');
		}
		return this.algorythm.cluster(this.vectors, k, iterations);
	}

	classify(vector) {
		let maxProbability = -1;
		let bestIndex = -1;
		this.algorythm.classes.forEach((c, index) => {
			const probability = c.getProbability(vector);
			console.log(probability, maxProbability);
			if (maxProbability < probability) {
				maxProbability = probability;
				bestIndex = index;
			}
		});
		return {index: bestIndex, probability: maxProbability};
	}

	static classify(vector, classes) {
		let maxProbability = -1;
		let bestIndex = -1;
		classes.forEach((c, index) => {
			const probability = c.getProbability(vector);
			if (maxProbability < probability) {
				maxProbability = probability;
				bestIndex = index;
			}
		});
		return {index: bestIndex, probability: maxProbability};
	}

	/**
	 * Tests with training data
	 * @param documents {}: Object with categories that contain arrays of trainingsdata
	 * @param clusters {}: optinal object to test a clustered object and not use internal cluster method (is used to test this function)
	 * @returns {Promise.<void>}
	 */
	async test(clusters, documents) {
		const ready = await this.ready;
		const loaded = await this.trained;
		if (ready && loaded) {
			return Test.testCluster(clusters, documents);
		}
	}
}