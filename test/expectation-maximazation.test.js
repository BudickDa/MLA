const assert = require('assert');
const util = require('util');
const _ = require('underscore');
const {DocumentClustering, Text, Utils, Test, Vector, Matrix, Algorythm} = require("../index");

const reports = require('./documents/reports.json');
const corpus = Test.constructCorpus(reports);

describe('Expectation Maximazation', function() {
	describe('#cluster', function() {
		const vectors = {
			'a': [
				new Vector([4, 0, 0], 'a'),
				new Vector([4, 1, 0], 'a'),
				new Vector([3, 0, 0], 'a'),
				new Vector([5, 0, 0], 'a'),
				new Vector([5, 1, 0], 'a')
			],
			'b': [
				new Vector([0, 4, 0], 'b'),
				new Vector([0, 4, 1], 'b'),
				new Vector([0, 3, 0], 'b'),
				new Vector([0, 5, 0], 'b'),
				new Vector([0, 5, 1], 'b')
			],
			'c': [
				new Vector([1, 0, 4], 'c'),
				new Vector([0, 0, 3], 'c'),
				new Vector([0, 0, 5], 'c'),
				new Vector([1, 0, 5], 'c')
			]
		};

		it('clusters vectors correctly into 3 clusters', function(done) {
			this.timeout(15000);
			const {training, test} = Test.splitDocuments(vectors);

			const em = new Algorythm.EM();
			em.cluster(Test.constructCorpus(vectors), 3).then(() => {
				const error = Test.testClusterer(em, test)
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 20, true, `Error should be less than 20 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});
});
