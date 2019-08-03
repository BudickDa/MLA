const assert = require('assert');
const {Utils, Vector, Matrix} = require("../index");

describe('Utils', function() {
	describe('#sum()', function() {
		it('should calculate sum of items in array', function() {
			
		});
		it('should calculate sum of items in array of arrays', function() {
			
		});
		it('should calculate sum of items in a matrix', function() {
			
		});
		it('should calculate sum of items in a vector', function() {
			
		});
	});

	describe('#mean()', function() {
		it('should calculate mean of an array of numbers', function() {
			const results = [
				{v: [3, 4, 5, 6, 7], r: 5},
				{v: [2, 3, 1], r: 2},
				{v: [2, 2, 2, 2], r: 2},
				{v: [3, 9, 9, 3], r: 6}
			]
			results.forEach(test => {
				assert.equal(Utils.mean(test.v), test.r, `Mean of ${test.v} should be ${test.r}`);
			});
		});
	});

	describe('#meanVector()', function() {
		it('should calculate mean vector of an array of vectors', function() {
			const results = [
				{v: [new Vector([3, 4, 5, 6, 7]), new Vector([3, 4, 5, 6, 7])], r: new Vector([3, 4, 5, 6, 7])},
				{v: [new Vector([1, 1, 1, 1, 1]), new Vector([3, 3, 3, 3, 3])], r: new Vector([2, 2, 2, 2, 2])},
				{v: [new Vector([1, 1, 1, 1, 1]), new Vector([5, 5, 9, 11, 11])], r: new Vector([3, 3, 5, 6, 6])},
			]
			results.forEach(test => {
				assert.deepEqual(Utils.meanVector(test.v), test.r, `Mean of ${test.v.values} should be ${test.r.values}`);
			});
		});
	});


	describe('#variance()', function() {
		it('should calculate variance of an array of numbers', function() {
			const results = [
				{v: [3, 4, 5, 6, 7], r: 2},
				{v: [2, 3, 1], r: 2 / 3},
				{v: [2, 2, 2, 2], r: 0},
				{v: [3, 9, 9, 3], r: 9}
			]
			results.forEach(test => {
				assert.equal(Utils.variance(test.v), test.r, `Mean of ${test.v} should be ${test.r}`);
			});
		});
	});

	describe('#varianceVector()', function() {
		it('should calculate variance vector of an array of vectors', function() {
			const results = [
				{v: [new Vector([3, 4, 5, 6, 7]), new Vector([3, 4, 5, 6, 7])], r: new Vector([0, 0])},
				{v: [new Vector([3, 4, 5, 6, 7]), new Vector([1, 2, 3, 4, 5])], r: new Vector([1, 1])},
				{v: [new Vector([3, 4, 5, 6, 7]), new Vector([1, 2, 3, 4, 5])], r: new Vector([1, 1])},
				{v: [new Vector([3, 4, 5, 6, 7]), new Vector([8, 7, 5, 3, 2])], r: new Vector([6.25, 2.25])}
			]
			results.forEach(test => {
				assert.deepEqual(Utils.varianceVector(test.v), test.r, `Mean of ${test.v.map(v => '[' + v.values + '] ')}should be ${test.r.values}`);
			});
		});
	});

	describe('#multivariantGaussian()', function() {
		const results = [
			{
				v: {
					vector: new Vector([1, 0]),
					mean: new Vector([0, 0]),
					sigma: new Matrix([[1, 0], [0, 1]])
				}, r: 0.0965323526301
			},
			{
				v: {
					vector: new Vector([1, 0, 0.5]),
					mean: new Vector([0.5, 0.3, 0.6]),
					sigma: new Matrix([[3, 0.65, 0], [1, 4, 0.5], [0.8, 0.8, 5]])
				}, r: 0.00819049499071
			},
			{
				v: {
					vector: new Vector([-1, 0, 0.5]),
					mean: new Vector([-1, 0, 0]),
					sigma: new Matrix([[1, 1, 1], [0.5, 1, 1], [1, 1, 2]])
				}, r: 0.074441476746
			}
		]
		results.forEach(test => {
			it(`should calculate the guassian multivariant of a point (${test.v.vector.values}) in a matrix`, function() {
				console.log(Utils.multivariantGaussian(test.v.vector, test.v.mean, test.v.sigma));
				assert.equal(Utils.multivariantGaussian(test.v.vector, test.v.mean, test.v.sigma),
					Math.round(test.r).toFixed(Utils.len), `Mean of (${test.v.vector.values}) should be ${test.r}`);
			});
		});
	});
});
