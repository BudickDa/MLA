const Test = {
	findCategory: function(document, documents) {
		for (let category in documents){
			if (_.contains(documents[category], document)) {
				return category;
			}
		}
	},
	getCorpus: function(documents){
		let corpus = [];
		for (let category in documents){
			corpus = corpus.concat(documents[category]);
		}
		return corpus;
	}
};
export {Test as default};
