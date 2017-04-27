const assert = require('assert');
const _ = require('underscore');
const {DocumentClustering, Text, Utils, Test} = require("../index");

const reports = require('./documents/reports.json');
const corpus = Test.constructCorpus(reports);

describe('DocumentClustering', function() {
	const clusterer = new DocumentClustering(corpus, 400);
	let tmpCenters;

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

	describe('#findCenter', function() {
		it('find optimal k centers', function(done) {
			this.timeout(30000);
			clusterer.findCenters(6).then(centers => {
				tmpCenters = centers;
				assert.equal(centers.length, 6);
				done();
			}).catch(err => {
				console.error(err);
				assert(false);
				done();
			});
		});
	});

	describe('#kNearestNeighbour', function() {
		it('kNearestNeighbour corpus', function() {
			clusterer.kNearestNeighbour(6, tmpCenters).then(clusters => {
				assert.equal(clusters.length, 6);
				let corrects = 0;
				let wrongs = 0;
				clusters.forEach(cluster => {
					const categories = [];
					cluster.forEach(report => {
						categories.push(Test.findCategory(report, reports));
					});
					const values = Utils.softmax(_.values(Text.wordCounter(categories)));
					const correct = _.max(values);
					const wrong = Utils.sum(values) - _.max(values);
					corrects += (correct * cluster.length);
					wrongs += (wrong * cluster.length);
				});
				const error = wrongs / corrects * 100;
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
			});
		});
	});

	describe('Cluster with rare first', function() {
		it('ranks common words higher than rare words with vector dimension 200', function(done) {
			const clusterer = new DocumentClustering(corpus, 200);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 45, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 400', function(done) {
			const clusterer = new DocumentClustering(corpus, 400);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 600', function(done) {
			const clusterer = new DocumentClustering(corpus, 600);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 800', function(done) {
			const clusterer = new DocumentClustering(corpus, 800);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 1000', function(done) {
			const clusterer = new DocumentClustering(corpus, 1000);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 2000', function(done) {
			const clusterer = new DocumentClustering(corpus, 2000);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
	});

	describe('Cluster with common first', function() {
		it('ranks common words higher than rare words with vector dimension 200', function(done) {
			const clusterer = new DocumentClustering(corpus, 200, false);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 45, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 400', function(done) {
			const clusterer = new DocumentClustering(corpus, 400, false);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 600', function(done) {
			const clusterer = new DocumentClustering(corpus, 600, false);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 800', function(done) {
			const clusterer = new DocumentClustering(corpus, 800, false);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 1000', function(done) {
			const clusterer = new DocumentClustering(corpus, 1000, false);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
		it('ranks common words higher than rare words with vector dimension 2000', function(done) {
			const clusterer = new DocumentClustering(corpus, 2000, false);
			clusterer.test(6, reports).then(error => {
				console.log(`Result: ${100 - error}, Error: ${error} %`);
				assert.equal(error < 40, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			});
		});
	});
});
