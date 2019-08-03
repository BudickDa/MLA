const assert = require('assert');
const _ = require('underscore');
const {DocumentClustering, Text, Utils, Test} = require("../index");

const reports = require('./documents/reports.json');
const split = Test.splitDocuments(reports);
const corpus = Test.constructCorpus(split.test);
const training = split.training;

describe('DocumentClustering', function() {
	const clusterer = new DocumentClustering._DocumentClustering(corpus);

	describe('#constructor', function() {
		it('load corpus in clusterer', function(done) {
			this.timeout(5000);
			clusterer.ready.then(ready => {
				assert(ready);
				assert(clusterer.vectors.length === corpus.length);
				assert.equal(clusterer.vectors[0].length(), 400);
				done();
			}).catch(err => {
				console.error(err);
				assert(false);
				done();
			});
		});
	});


	describe('#trainAsync', function() {
		it('train with trainingsdata, we use async method for testing.', function(done) {
			clusterer.trainingsData = reports.training;
			clusterer.trainAsync().then(() => {
				assert.equal(clusterer.centers.length, Test.categories(reports.training).length, 'Should have one center for every category in trainings data');
				clusterer.trained = true;
				done();
			}).catch(console.error);
		});
	});

	describe('#cluster', function() {
		it('cluster corpus', function(done) {
			this.timeout(5000);
			clusterer.cluster().then(() => {
				assert(false, 'Promise should fail.');
				done();
			}).catch(err => {
				assert.equal(err instanceof Error, true, 'cluster should fail, this is an abstract class');
				done();
			});
		});
	});

	describe('#test', function() {
		it('should have 0 error, because documents are clustered like trainingsdata', function(done) {
			this.timeout(5000);
			const clusters = [];
			for (let category in reports){
				clusters.push(reports[category]);
			}
			clusterer.test(reports, clusters).then(result => {
				assert.equal(result, 0, 'Should be 0 (no error).');
				done();
			});
		});

		it('should have 0 error, order has changed but still clustered correctly', function(done) {
			this.timeout(5000);
			clusterer.test(
				{'a': ['a', 'a'], 'b': ['b', 'b'], 'c': ['c', 'c']},
				[['a', 'a'], ['c', 'c'], ['b', 'b']]
			).then(result => {
				assert.equal(result, 0, 'Should be 0 (no error).');
				done();
			});
		});

		it('should have 33 % error, 2 errors in 6', function(done) {
			this.timeout(5000);
			clusterer.test(
				{'a': ['a', 'a'], 'b': ['b', 'b'], 'c': ['c', 'c']},
				[['a', 'b'], ['c', 'c'], ['b', 'a']]
			).then(result => {
				assert.equal(parseInt(result), 33, 'Should be 0 (no error).');
				done();
			}).catch(console.error);
		});

		it('should have 50 % error, 3 errors in 6', function(done) {
			this.timeout(5000);
			clusterer.test(
				{'a': ['a', 'a'], 'b': ['b', 'b'], 'c': ['c', 'c']},
				[['a', 'b'], ['c', 'b'], ['c', 'a']]
			).then(result => {
				assert.equal(parseInt(result), 50, 'Should be 0 (no error).');
				done();
			}).catch(console.error);
		});

		it('should have 66 % error, 6 errors in 9', function(done) {
			this.timeout(5000);
			clusterer.test(
				{'a': ['a', 'a', 'a'], 'b': ['b', 'b', 'b'], 'c': ['c', 'c', 'c']},
				[['a', 'b', 'c'], ['a', 'b', 'c'], ['a','b', 'c']]
			).then(result => {
				assert.equal(parseInt(result), 66, 'Should be 0 (no error).');
				done();
			}).catch(console.error);
		});
	});
});
