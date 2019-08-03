const assert = require('assert');
const _ = require('underscore');
const {DocumentClustering, Text, Utils, Test, Vector} = require("../index");

const reports = require('./documents/reports.json');
const corpus = Test.constructCorpus(reports);

describe('DocumentClustering.KMeans', function() {
	describe('#cluster', function() {
		const vectors = {
			'a': [
				new Vector([4, 0, 0]),
				new Vector([4, 1, 0]),
				new Vector([3, 0, 0]),
				new Vector([5, 0, 0]),
				new Vector([5, 1, 0]),
			],
			'b': [
				new Vector([4, 0, 0]),
				new Vector([0, 4, 1]),
				new Vector([0, 3, 0]),
				new Vector([0, 5, 0]),
				new Vector([0, 5, 1]),
			],
			'c': [
				new Vector([1, 0, 4]),
				new Vector([0, 0, 3]),
				new Vector([0, 0, 5]),
				new Vector([1, 0, 5]),]
		};

		it('cluster vectors correctly with 10 iterations', function(done) {
			this.timeout(5000);
			DocumentClustering.KMeans.cluster(Test.constructCorpus(vectors), 3, 10).then(clusters => {
				const error = Test.testCluster(clusters, vectors)
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 20, true, `Error should be less than 20 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});

	describe('#_findBestCluster', function() {
		const allCluster = [
			{
				clusters: 'best',
				quality: 100
			},
			{
				clusters: 'worse',
				quality: 0
			}, {
				clusters: 'worse',
				quality: 50
			},
			{
				clusters: 'worse',
				quality: 30
			}
		];
		it('should return the clusters with highes quality', function() {
			const clusters = DocumentClustering.KMeans._findBestCluster(allCluster);
			assert.equal(clusters, 'best');
		});
	});

	describe('#_qualityOfCenters', function() {
		it('vectors of centers that are far from each other', function() {
			const badQuality = DocumentClustering.KMeans._qualityOfCenters([
				new Vector([0, 3]),
				new Vector([0, 2]),
				new Vector([3, 2]),
				new Vector([2, 2])
			]);

			const goodQuality = DocumentClustering.KMeans._qualityOfCenters([
				new Vector([0, 0]),
				new Vector([0, 4]),
				new Vector([4, 0]),
				new Vector([4, 4])
			]);
			assert.equal(goodQuality > badQuality, true, 'Good quality should be higher than bad quality centers');
		});
	});

	describe('Cluster example test', function() {
		const test = {
			'a': [
				'Alpha, Alpha this is sparta!',
				'Alpha, Alpha this is Rome!',
				'Alpha, Alpha this is Alpha!'
			],
			'b': [
				'Bravo. Bravo is bravo. Lorem ipsum.',
				'Bravo. Bravo is bravo. Lorem is the Letter.',
				'Bravo. Bravo is bravo. Bravo.'
			],
			'c': [
				'Charlie, charlie. This is charlie. Lorem ipsum.',
				'Charlie, charlie. Bird is the word.',
				'Charlie, charlie. Let\'s twist again!',
			]
		};
		it('should sort everything correctly with 2 iterations', function(done) {
			const clusterer = new DocumentClustering.KMeans(Test.constructCorpus(test));
			clusterer.test(test, 3, 10).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 25, true, `Error should be less than 20 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('should sort everything correctly with 5 iterations', function(done) {
			const clusterer = new DocumentClustering.KMeans(Test.constructCorpus(test));
			clusterer.test(test, 3, 10).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 25, true, `Error should be less than 20 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('should sort everything correctly with 10 iterations', function(done) {
			const clusterer = new DocumentClustering.KMeans(Test.constructCorpus(test));
			clusterer.test(test, 3, 10).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 20, true, `Error should be less than 10 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('should sort everything correctly with 20 iterations', function(done) {
			this.timeout(5000);
			const clusterer = new DocumentClustering.KMeans(Test.constructCorpus(test));
			clusterer.test(test, 3, 10).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 10, true, `Error should be less than 5 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});

	describe('Cluster with rare first', function() {
		this.timeout(5000);
		it('ranks common words higher than rare words with vector dimension 200', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 200, false);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 400', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 400, false);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 600', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 600, false);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 800', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 800, false);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 1000', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 1000, false);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 2000', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 2000, false);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});

	describe('Cluster with common first', function() {
		it('ranks common words higher than rare words with vector dimension 200', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 200, true);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 400', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 400, true);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 600', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 600, true);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 800', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 800, true);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 1000', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 1000, true);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('ranks common words higher than rare words with vector dimension 2000', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus, 2000, true);
			clusterer.test(reports).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});
	describe('Cluster with different number of iterations', function() {
		it('cluster with 10 iterations', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus);
			clusterer.test(reports, 6, 10).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('cluster with 50 iterations', function(done) {
			const clusterer = new DocumentClustering.KMeans(corpus);
			clusterer.test(reports, 6, 50).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('cluster with 100 iterations', function(done) {
			this.timeout(5000);
			const clusterer = new DocumentClustering.KMeans(corpus);
			clusterer.test(reports, 6, 100).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('cluster with 200 iterations', function(done) {
			this.timeout(10000);
			const clusterer = new DocumentClustering.KMeans(corpus);
			clusterer.test(reports, 6, 200).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('cluster with 500 iterations', function(done) {
			this.timeout(10000);
			const clusterer = new DocumentClustering.KMeans(corpus);
			clusterer.test(reports, 6, 500).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
		it('cluster with 1000 iterations', function(done) {
			this.timeout(20000);
			const clusterer = new DocumentClustering.KMeans(corpus);
			clusterer.test(reports, 6, 1000).then(error => {
				console.log(`Correct: ${100 - parseInt(error)} %`);
				assert.equal(error < 80, true, `Error should be less than 40 %. Error: ${error}`);
				done();
			}).catch(console.error);
		});
	});
});
