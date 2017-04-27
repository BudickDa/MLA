import _ from 'underscore';

export default class Test {
	static findCategory(document, documents) {
		for (let category in documents){
			if (_.contains(documents[category], document)) {
				return category;
			}
		}
	}

	static constructCorpus(documents) {
		let corpus = [];
		for (let category in documents){
			corpus = corpus.concat(documents[category]);
		}
		return corpus;
	}
}
