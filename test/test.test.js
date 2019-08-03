const assert = require('assert');
const {Test, Vector} = require("../index");

describe('Test', function() {
	describe('#testCluster', function() {
		it('should ', function() {

		});
		it('should return difference between clustered data and test data as value', function() {

		});
	});

	describe('#findCategory', function() {
		it('should find category of a string in an object of documents', function() {
			const documents = {
				'a': ['Test AA', 'Test AB', 'Test AC'],
				'b': ['Test BA', 'Test BB', 'Test BC'],
				'c': ['Test CA', 'Test CB', 'Test CC']
			};

			const results = [
				{v: 'Test AA', r: 'a'},
				{v: 'Test AB', r: 'a'},
				{v: 'Test AC', r: 'a'},

				{v: 'Test BA', r: 'b'},
				{v: 'Test BB', r: 'b'},
				{v: 'Test BC', r: 'b'},

				{v: 'Test CA', r: 'c'},
				{v: 'Test CB', r: 'c'},
				{v: 'Test CC', r: 'c'}
			];

			results.forEach(test => {
				assert.equal(Test.findCategory(test.v, documents), test.r, `Category of ${test.v} should be ${test.r}`);
			});
		});

		it('should find category of a vector in an object of documents', function() {
			const documents = {
				'a': [new Vector([1, 2, 3]), new Vector([4, 5, 6]), new Vector([7, 8, 9])],
				'b': [new Vector([11, 12, 13]), new Vector([14, 15, 16]), new Vector([17, 18, 19])],
				'c': [new Vector([21, 22, 23]), new Vector([24, 25, 26]), new Vector([27, 28, 29])]
			};

			const results = [
				{v: new Vector([1, 2, 3]), r: 'a'},
				{v: new Vector([4, 5, 6]), r: 'a'},
				{v: new Vector([7, 8, 9]), r: 'a'},

				{v: new Vector([11, 12, 13]), r: 'b'},
				{v: new Vector([14, 15, 16]), r: 'b'},
				{v: new Vector([17, 18, 19]), r: 'b'},

				{v: new Vector([21, 22, 23]), r: 'c'},
				{v: new Vector([24, 25, 26]), r: 'c'},
				{v: new Vector([27, 28, 29]), r: 'c'},

				{v: new Vector([2, 1, 1]), r: undefined},
				{v: new Vector([1, 3, 2]), r: undefined},
				{v: new Vector([3, 2, 1]), r: undefined},
			];

			results.forEach(test => {
				assert.equal(Test.findCategory(test.v, documents), test.r, `Category of ${test.v} should be ${test.r}`);
			});
		});
	});
});
