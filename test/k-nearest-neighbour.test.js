const assert = require('assert');
const _ = require('underscore');
const {DocumentClustering, Text, Utils, Test} = require("../index");

const reports = require('./documents/reports.json');
const split = Test.splitDocuments(reports);
const corpus = Test.constructCorpus(split.test);
const training = split.training;

describe('DocumentClustering.KNearestNeighbour', function() {
	describe('Cluster with rare first', function() {
		this.timeout(5000);
		it('ranks common words higher than rare words with vector dimension 200', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 200, false);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 400', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 400, false);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 600', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 600, false);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 800', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 800, false);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 1000', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 1000, false);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 2000', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 2000, false);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});

	describe('Cluster with common first', function() {
		it('ranks common words higher than rare words with vector dimension 200', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 200, true);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 400', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 400, true);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 600', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 600, true);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 800', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 800, true);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 1000', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 1000, true);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 2000', function(done) {
			const clusterer = new DocumentClustering.KNearestNeighbour(corpus, 2000, true);
			clusterer.train(training);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 65, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});
});
