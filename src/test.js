import _ from 'lodash';
import Chance from 'chance';
import Vector from './vector';
import DocumentClustering from './clusterer/document-clustering';
import util from 'util';
const chance = new Chance();

export default class Test {
	static findCategory(document, documents) {
		for (let category in documents){
			if (typeof document === 'string') {
				if (_.includes(documents[category], document)) {
					return category;
				}
			}

			if (document instanceof Vector) {
				for (let i in documents[category]){
					if (document.equal(documents[category][i])) {
						return category;
					}
				}
			}
		}
	}

	static categories(documents) {
		const categories = [];
		for (let category in documents){
			categories.push(category);
		}
		return categories;
	}

	static constructCorpus(documents) {
		let corpus = [];
		for (let category in documents){
			corpus = corpus.concat(documents[category]);
		}
		return corpus;
	}

	static splitDocuments(documents, ratio = 0.3) {
		const training = {};
		const test = {};
		for (let category in documents){
			training[category] = chance.pickset(documents[category], documents[category].length * ratio);
			test[category] = _.difference(documents[category], training[category]);
		}
		return {
			training: training,
			test: test
		}
	}

	/**
	 * Calculates error by comparing clusters to test data
	 * @param clusters {[[]]}
	 * @param test {{category: []}
	 * @returns {number}
	 */
	static testClusterer(em, test) {
		let corrects = 0;
		let wrongs = 0;

		for (let category in test){
			let vectors = test[category];
			vectors.forEach(vector => {
				console.log('Test');
				console.log(DocumentClustering.classify(vector, em.classes));
				console.log(category);
			});
		}
		return wrongs / (corrects + wrongs) * 100;
	}
}
