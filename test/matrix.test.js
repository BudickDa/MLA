const assert = require('assert');
const _ = require('lomath');
const chai = require('chai');
const {Matrix, Vector} = require("../index");

describe('Matrix', function() {
	describe('#constructor()', function() {
		it('create matrix from array of vectors', function() {
			const m = new Matrix([
				new Vector([1, 2, 3, 4]),
				new Vector([5, 6, 7, 8]),
				new Vector([9, 10, 11, 12]),
				new Vector([13, 14, 15, 16])
			]);
			assert.deepEqual(m.values, [
				[1, 5, 9, 13],
				[2, 6, 10, 14],
				[3, 7, 11, 15],
				[4, 8, 12, 16]
			]);
		});
		it('create matrix from array of arrays', function() {
			const m = new Matrix([
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
				[13, 14, 15, 16]
			]);
			assert.deepEqual(m.values, [
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
				[13, 14, 15, 16]
			]);
		});
	});

	describe('#getValue()', function() {
		const m = new Matrix([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
			[13, 14, 15, 16]
		]);
		it('get value digonal of from matrix', function() {
			assert.equal(m.getValue(0, 0), 1);
			assert.equal(m.getValue(1, 1), 6);
			assert.equal(m.getValue(2, 2), 11);
			assert.equal(m.getValue(3, 3), 16);
		});

		it('get value from other places of matrix', function() {
			assert.equal(m.getValue(0, 3), 13);
			assert.equal(m.getValue(1, 3), 14);
			assert.equal(m.getValue(3, 0), 4);
			assert.equal(m.getValue(3, 1), 8);
		});
	});

	describe('#setValue()', function() {
		const m = new Matrix([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
			[13, 14, 15, 16]
		]);

		it('set value from other places of matrix', function() {
			m.setValue(0, 3, 42);
			m.setValue(1, 3, 43);
			m.setValue(3, 0, 44);
			m.setValue(3, 1, 85);

			assert.equal(m.getValue(0, 3), 42);
			assert.equal(m.getValue(1, 3), 43);
			assert.equal(m.getValue(3, 0), 44);
			assert.equal(m.getValue(3, 1), 85);
		});
	});

	describe('#scalar()', function() {
		let m = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]);

		it('multiply all values with 2', function() {
			m = m.scalar(2);
			assert.deepEqual(m.values, [
				[2, 4, 6],
				[8, 10, 12],
				[14, 16, 18]
			]);
		});

		it('multiply all values with 2', function() {
			m = m.scalar(1 / 2);
			assert.deepEqual(m.values, [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			]);
		});
	});

	describe('#offset()', function() {
		let m = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]);

		it('add 2 to all values', function() {
			m = m.offset(2);
			assert.deepEqual(m.values, [
				[3, 4, 5],
				[6, 7, 8],
				[9, 10, 11]
			]);
		});

		it('subtract 2 from all values', function() {
			m = m.offset(-2);
			assert.deepEqual(m.values, [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			]);
		});
	});

	describe('#pow()', function() {
		it('pow 2 to all values', function() {
			let m = new Matrix([
				[2, 2, 2],
				[2, 2, 2],
				[2, 2, 2]
			]);
			m = m.pow();
			assert.deepEqual(m.values, [
				[4, 4, 4],
				[4, 4, 4],
				[4, 4, 4]
			]);
		});

		it('pow 2 to all values', function() {
			let m = new Matrix([
				[2, 2, 2],
				[2, 2, 2],
				[2, 2, 2]
			]);
			m = m.pow(2);
			assert.deepEqual(m.values, [
				[4, 4, 4],
				[4, 4, 4],
				[4, 4, 4]
			]);
		});

		it('pow 2 to different values', function() {
			let m = new Matrix([
				[2, 3, 4],
				[4, 3, 2],
				[3, 2, 4]
			]);
			m = m.pow(2);
			assert.deepEqual(m.values, [
				[4, 9, 16],
				[16, 9, 4],
				[9, 4, 16]
			]);
		});

		it('pow 3 to all values', function() {
			let m = new Matrix([
				[2, 2, 2],
				[2, 2, 2],
				[2, 2, 2]
			]);
			m = m.pow(3);
			assert.deepEqual(m.values, [
				[8, 8, 8],
				[8, 8, 8],
				[8, 8, 8]
			]);
		});

		it('pow 4 to all values', function() {
			let m = new Matrix([
				[2, 2, 2],
				[2, 2, 2],
				[2, 2, 2]
			]);
			m = m.pow(4);
			assert.deepEqual(m.values, [
				[16, 16, 16],
				[16, 16, 16],
				[16, 16, 16]
			]);
		});
	});

	describe('#dimX() and #dimY()', function() {
		const m = new Matrix([
			[1, 2],
			[3, 4],
			[5, 6]
		]);
		it('should return dimensions in horzontal', function() {
			assert.equal(m.dimX(), 2);
		});
		it('should return dimension in vertical', function() {
			assert.equal(m.dimY(), 3);
		});
	});

	describe('#transpose()', function() {
		const m = new Matrix([
			[1, 2],
			[3, 4],
			[5, 6]
		]);
		it('transpose matrix', function() {
			assert.deepEqual(m.transpose().values,
				[
					[1, 3, 5],
					[2, 4, 6]
				]);
		});
		it('should change the dimension when transposed', function() {
			const tm = m.transpose();
			assert.equal(tm.dimX(), 3);
			assert.equal(tm.dimY(), 2);
		});
	});

	describe('#euclideanDistance()', function() {
		it('should return 0', function() {
			const m = new Matrix([
				[1, 2],
				[2, 1]
			]);
			const n = m.transpose();
			assert.equal(n.euclideanDistance(m), 0);
		});

		it('should return 4 (sqrt(4+4+4+4))', function() {
			const m = new Matrix([
				[1, 1],
				[1, 1]
			]);
			const n = new Matrix([
				[3, 3],
				[3, 3]
			])
			assert.equal(n.euclideanDistance(m), 4);
		});
	});

	describe('#min()', function() {
		it('should return the minimal value (0) of matrix', function() {
			const m = new Matrix([
				[1, 0],
				[2, 3]
			]);
			assert.equal(m.min(), 0);
		});

		it('should return the minimal value (-10) of matrix', function() {
			const m = new Matrix([
				[-10, 0],
				[2, 3]
			]);
			assert.equal(m.min(), -10);
		});

		it('should return the minimal value (10) of matrix', function() {
			const m = new Matrix([
				[10, Infinity],
				[Infinity, Infinity]
			]);
			assert.equal(m.min(), 10);
		});
	});

	describe('#max()', function() {
		it('should return the maximal value (0) of matrix', function() {
			const m = new Matrix([
				[-3, 0],
				[-1, -4]
			]);
			assert.equal(m.max(), 0);
		});

		it('should return the maximal value (-10) of matrix', function() {
			const m = new Matrix([
				[-10, -100],
				[-20, -30]
			]);
			assert.equal(m.max(), -10);
		});

		it('should return the maximal value (10) of matrix', function() {
			const m = new Matrix([
				[10, 5],
				[2, 1]
			]);
			assert.equal(m.max(), 10);
		});

		it('should return the maximal value (Infinity) of matrix', function() {
			const m = new Matrix([
				[10, Infinity],
				[Infinity, Infinity]
			]);
			assert.equal(m.max(), Infinity);
		});
	});

	describe('#_fnc()', function() {
		const m = new Matrix([
			[1, 2],
			[4, 8]
		]);
		const n = new Matrix([
			[1, 2],
			[4, 8]
		]);
		it('should sum n and m', function() {
			assert.deepEqual(m._fnc(n, 'ADD'), new Matrix([
				[2, 4],
				[8, 16]
			]));
			assert.deepEqual(m.add(n), new Matrix([
				[2, 4],
				[8, 16]
			]));
		});

		it('should subtract n from m', function() {
			assert.deepEqual(m._fnc(n, 'SUB'), new Matrix([
				[0, 0],
				[0, 0]
			]));
			assert.deepEqual(m.sub(n), new Matrix([
				[0, 0],
				[0, 0]
			]));
		});

		it('should multiply n and m', function() {
			assert.deepEqual(m._fnc(n, 'MUL'), new Matrix([
				[1, 4],
				[16, 64]
			]));
			assert.deepEqual(m.mul(n), new Matrix([
				[1, 4],
				[16, 64]
			]));
		});

		it('should divide m by n', function() {
			assert.deepEqual(m._fnc(n, 'DIV'), new Matrix([
				[1, 1],
				[1, 1]
			]));
			assert.deepEqual(m.div(n), new Matrix([
				[1, 1],
				[1, 1]
			]));
		});

		it('should modulo m by n', function() {
			assert.deepEqual(m._fnc(n, 'MOD'), new Matrix([
				[0, 0],
				[0, 0]
			]));
			assert.deepEqual(m.mod(n), new Matrix([
				[0, 0],
				[0, 0]
			]));
		});
	});

	describe('#equal()', function() {
		const m = new Matrix([
			[1, 2],
			[4, 8]
		]);
		const n = new Matrix([
			[1, 2],
			[4, 8]
		]);
		const o = new Matrix([
			[2, 1],
			[4, 8]
		]);
		const p = new Matrix([
			[4, 8],
			[1, 2]
		]);
		const q = new Matrix([
			[1, 2],
			[4, 9]
		])

		it('should return true because both matrices are equal', function() {
			assert.equal(m.equal(n), true);
		});

		it('should return false because both matrices have equal values but different order', function() {
			assert.equal(m.equal(o), false);
			assert.equal(m.equal(p), false);
		});

		it('should return false because both matrices are fifferent in on value', function() {
			assert.equal(m.equal(q), false);
		});
	});

	describe('#copy()', function() {
		const m = new Matrix([
			[1, 2],
			[4, 8]
		]);
		it('should return an equal matrix when copying', function() {
			assert.equal(m.equal(m.copy()), true);
		});
	});

	describe('#random()', function() {
		const m = new Matrix([
			[0, 0],
			[0, 0]
		]);
		it('should return an equal matrix when copying', function() {
			assert.equal(m.equal(m.random()), false, 'randomly generated values should be different to 0');
			const n = m.random();
			assert.equal(m.dimX(), n.dimX(), 'should have the same dimension X');
			assert.equal(m.dimY(), n.dimY(), 'should have the same dimension Y');
		});
	});

	describe('#fill()', function() {
		const m = new Matrix([
			[0, 0],
			[0, 0]
		]);
		const one = new Matrix([
			[1, 1],
			[1, 1]
		]);
		const infiniy = new Matrix([
			[Infinity, Infinity],
			[Infinity, Infinity]
		]);
		it('should return a matrix full of ones', function() {
			assert.equal(one.equal(m.fill(1)), true);
		});

		it('should return a matrix full of Infinity', function() {
			assert.equal(infiniy.equal(m.fill(Infinity)), true);
		});
	});

	describe('#diag()', function() {
		const m = new Matrix([
			[0, 0],
			[0, 0]
		]);
		const n = new Matrix(3, 3);
		const o = new Matrix(4, 4);

		it('should return a 2x2 matrix with diag of ones', function() {
			assert.deepEqual(m.diag(1), new Matrix([[1, 0], [0, 1]]));
		});

		it('should return a 2x2 matrix with diag of ones', function() {
			assert.deepEqual(n.diag(1), new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
		});

		it('should return a 4x4 matrix with diag of minus one', function() {
			assert.deepEqual(o.diag(-1), new Matrix([[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, -1]]));
		});
	});

	describe('#inv()', function() {
		if ('should work, because this matrix is invertible', function() {
				assert.equal(new Matrix([
					[1, 4, 7],
					[3, 0, 5],
					[-1, 9, 11]]).det(), new Matrix([
					[5.625, -2.375, -2.5],
					[4.75, -2.25, -2],
					[-3.375, 1.625, 1.5]]), 'this should work');
			});
		it('should throw, because this matrix is not invertible', function() {
			const m = new Matrix([[1, 1], [1, 1]]);
			assert.throws(() => {
				m.inv()
			}, Error);
		});
	});

	describe('#det()', function() {
		const results = [
			{v: new Matrix([[3, 8], [4, 6]]), r: -14},
			{v: new Matrix([[6, 1, 1], [4, -2, 5], [2, 8, 7]]), r: -306},
			{v: new Matrix([[6, 1, 1, 2], [4, -2, 5, 3], [2, 8, 7, 3], [1, 3, 3, 7]]), r: -1734},
			{
				v: new Matrix([
					[6, 1, 1, 2, 7],
					[4, -2, 5, 3, 2],
					[2, 8, 10, 3, 2],
					[2, 8, 7, 3, 5],
					[1, 3, 3, 7, 2]
				]), r: 3861
			}, {
				v: new Matrix([
					[6, 1, 21, 2, 16, 1, 1, 2],
					[4, -2, 5, 3, 4, 2, 43, 3],
					[2, 8, 7, 3, 2, 8, 73, 3],
					[1, 23, 3, 7, 1, 4, 3, 4],
					[6, 1, 43, 2, 6, 1, 1, 0],
					[4, 2, 5, 3, 4, 2, 5, 3],
					[2, 8, 11, 3, 2, 5, 7, 0],
					[1, 3, 3, 7, 1, 3, 3, 7]
				]),
				r: -111062240
			}, {
				v: new Matrix([
					[6, 1, 1, 2, 6, 1, 1, 24, -2, 5],
					[2, 8, 7, 3, 12, 2, 1, 3, 3, 7],
					[20, 3, 27, 3, 2, 22, 1, 300, 3, 71],
					[2, 1, 7, 3, 2, 402, 12, 3, 3, 7],
					[12, 8, 7, 3, 21, 5, 14, 3, 33, 7],
					[42, 3, 47, 3, 2, 2, 1, 3, 3, 0],
					[42, 4, 7, 33, 22, 232, 65, 3, 3, 37],
					[32, 1, 7, 3, 2, 32, 31, 23, 13, 17],
					[6, 3, 7, 33, 42, 2, 14, 63, 3, 7],
					[0, 6, 7, 3, 52, 2, 1, 33, 3, 73]
				]),
				r: -5900727022795200
			}, {
				v: new Matrix([
					[6, 1, 1, 2, 6, 1, 1, 24, -2, 5, 2, 4],
					[2, 8, 7, 3, 12, 2, 1, 3, 3, 7, 63, 43],
					[20, 3, 27, 3, 2, 22, 1, 300, 3, 71, 32, 6],
					[2, 1, 7, 3, 2, 402, 12, 3, 3, 7, 53, 5],
					[12, 8, 7, 3, 21, 5, 14, 3, 33, 7, 3, 4],
					[42, 3, 47, 3, 2, 2, 1, 3, 3, 0, 2, 3],
					[42, 4, 7, 33, 22, 232, 65, 3, 37, 1, 4, 3],
					[32, 1, 7, 3, 2, 32, 31, 23, 13, 35, 4, 6],
					[6, 3, 7, 33, 42, 2, 14, 63, 3, 1, 3, 5],
					[0, 6, 7, 3, 52, 2, 1, 33, 3, 73, 4, 5],
					[42, 3, 47, 33, 2, 2, 1, 3, 3, 0, 2, 3],
					[42, 3, 47, 3, 2, 2, 1, 3, 3, 0, 2, 3]
				]),
				r: 0
			}, {
				v: new Matrix([
					[6, 1, 1, 2, 6, 1, 1, 24, -2, 5, 2, 4, 1, 3],
					[2, 8, 7, 3, 12, 2, 1, 3, 3, 7, 63, 4, 3, 5],
					[20, 3, 27, 3, 2, 22, 1, 300, 3, 71, 6, 32, 6, 4],
					[2, 1, 7, 3, 2, 402, 12, 3, 3, 7, 9, 53, 5, 22],
					[12, 8, 7, 3, 21, 5, 14, 3, 33, 7, 1, 3, 4, 5],
					[42, 3, 47, 3, 2, 2, 1, 3, 3, 0, 5, 2, 3, 5],
					[42, 4, 7, 33, 22, 232, 65, 3, 3, 37, 1, 4, 3, 5],
					[32, 1, 7, 3, 2, 32, 31, 23, 13, 17, 35, 4, 6, 4],
					[6, 3, 7, 33, 42, 2, 14, 63, 3, 7, 1, 3, 5, 4],
					[0, 6, 7, 3, 52, 2, 1, 33, 3, 73, 2, 4, 5, 3],
					[42, 3, 47, 33, 2, 2, 1, 3, 3, 0, 5, 2, 3, 5],
					[42, 3, 47, 3, 2, 2, 1, 3, 3, 0, 5, 2, 3, 5],
					[42, 3, 47, 31, 2, 2, 11, 23, 3, 10, 5, 2, 3, 5],
					[42, 3, 47, 23, 2, 2, 1, 31, 3, 0, 5, 22, 3, 5],
				]),
				r: 0
			},
			{
				v: new Matrix([[3.64292419375026, -2.770929457351801, -5.326275180271114, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 3.52286009735364, -2.8993823654873943, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 4.794442183398455, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, Number.EPSILON, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, Number.EPSILON, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, Number.EPSILON, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, Number.EPSILON, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, Number.EPSILON, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, Number.EPSILON, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, Number.EPSILON, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Number.EPSILON, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Number.EPSILON, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Number.EPSILON, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Number.EPSILON]]), r: 3.98e-171
			}
		];
		results.forEach(test => {
			it(`should return determinante of (${test.v.values})`, function(done) {
				chai.assert.approximately(test.v.det(), test.r, Math.abs(0.0001 * test.r), `Determinant should be ${test.r}`);
				done();
			});
		});
	});
});
