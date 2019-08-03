import _ from 'lomath';
import Chance from 'chance';
import numeric from 'numeric';
import Vector from './vector';
import Utils from './utils';

const chance = new Chance();

export default class Matrix {
	constructor(vectorsOrMatrix, j) {
		if (vectorsOrMatrix) {
			if (Utils.isVectorArray(vectorsOrMatrix)) {
				this.values = _.unzip(vectorsOrMatrix.map(v => v.values));
			} else if (Array.isArray(vectorsOrMatrix) &&
				vectorsOrMatrix.length > 0 &&
				vectorsOrMatrix.every(i => Array.isArray(i) && i.every(j => typeof j === 'number'))) {
				this.values = vectorsOrMatrix;
			} else if (typeof vectorsOrMatrix === 'number' && typeof j === 'number') {
				this.values = Array.apply(null, Array(vectorsOrMatrix)).map(
					() => (Array.apply(null, Array(j)).map(Number.prototype.valueOf, 0))
				);
			} else {
				throw TypeError("Matrix: Parameter of constructor has to be an array of vectors or an array of arrays of number");
			}
		} else {
			throw TypeError("Matrix: At least one parameter has to be set");
		}
		this._dimX = _.first(this.values).length;
		this._dimY = this.values.length;
	}

	forEach(cb) {
		this.values.forEach(cb);
	}

	map(cb) {
		this.values.map(cb);
	}

	setValue(j, i, value) {
		if (typeof i !== "number" || typeof j !== "number") {
			throw TypeError("i and j have to be a number.");
		}
		if (typeof value !== "number") {
			throw TypeError("value have to be a number.");
		}
		if (i >= this._dimY) {
			throw RangeError(`Index out of bounds: ${i}, max: ${this.values.length - 1}`);
		}
		if (j >= this._dimX) {
			throw RangeError(`Index out of bounds: ${j}, max: ${this.values[0].length - 1}`);
		}

		this.values[i][j] = value;
	}

	getValue(j, i) {
		if (typeof i !== "number" || typeof j !== "number") {
			throw TypeError("i and j have to be a number.");
		}
		if (i >= this._dimY) {
			throw RangeError(`Index out of bounds: ${i}, max: ${this.values.length - 1}`);
		}
		if (j >= this._dimX) {
			throw RangeError(`Index out of bounds: ${j}, max: ${this.values[0].length - 1}`);
		}
		return this.values[i][j];
	}

	/**
	 * Multiply values by number
	 * @param number
	 * @returns {Vector}
	 */
	scalar(number) {
		if (typeof number !== 'number') {
			throw new TypeError("Matrix: Parameter number in scalar has to be a number.");
		}
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach(value => {
				values[i].push(value * number);
			});
		});
		return new Matrix(values);
	}

	/**
	 * Offset values by number
	 * @param number
	 * @returns {Vector}
	 */
	offset(number) {
		if (typeof number !== 'number') {
			throw new TypeError("Matrix: Parameter number in offset has to be a number.");
		}
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach(value => {
				values[i].push(value + number);
			});
		});
		return new Matrix(values);
	}

	pow(number = 2) {
		if (typeof number !== 'number') {
			throw new TypeError("Matrix: Parameter number in pow has to be a number.");
		}
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach(value => {
				values[i].push(Math.pow(value, number));
			});
		});
		return new Matrix(values);
	}

	/**
	 * Calculates euclidean distance between two matrices.
	 * @param matrix
	 * @returns {number}
	 */
	euclideanDistance(matrix) {
		if (!(matrix instanceof Matrix)) {
			throw new TypeError(`Matrix: Parameter matrix in euclideanDistance has to be a matrix.`);
		}
		if (this.dimX() !== matrix.dimX() || this.dimY() !== matrix.dimY()) {
			throw new TypeError(`Matrix: Parameter matrix in euclideanDistance has to has the same dimensions.`);
		}
		let sum = 0;
		this.values.forEach((row, i) => {
			row.forEach((value, j) => {
				sum += Math.pow(value - matrix.getValue(i, j), 2);
			});
		});
		return Math.sqrt(sum);
	}

	gaussianDistance(n) {
		return numeric.norminf(this.values, n.values);
	}

	mean() {
		return Utils.meanVector(this.values.map(v => new Vector(v)));
	}

	min() {
		return _.min(_.flattenDeep(this.values));
	}

	max() {
		return _.max(_.flattenDeep(this.values));
	}

	_fnc(matrix, type) {
		if (!(matrix instanceof Matrix)) {
			throw new TypeError(`Matrix: Parameter matrix in ${type} has to be a vector.`);
		}
		if (this.dimX() !== matrix.dimX() || this.dimY() !== matrix.dimY()) {
			throw new TypeError(`Matrix: Can only ${type} matrix with the same dimensions.`);
		}
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach((value, j) => {
				switch (type) {
					case 'ADD':
						values[i].push(value + matrix.getValue(j, i));
						break;
					case 'SUB':
						values[i].push(value - matrix.getValue(j, i));
						break;
					case 'MUL':
						values[i].push(value * matrix.getValue(j, i));
						break;
					case 'DIV':
						values[i].push(value / matrix.getValue(j, i));
						break;
					case 'MOD':
						values[i].push(value % matrix.getValue(j, i));
						break;
					default:
						throw new EvalError(`Matrix: Parameter type (${type}) in fnc is not supported`)
				}
			});
		});
		return new Matrix(values);
	}

	add(m) {
		return this._fnc(m, 'ADD');
	}

	sub(m) {
		return this._fnc(m, 'SUB');
	}

	mul(m) {
		return this._fnc(m, 'MUL');
	}

	div(m) {
		return this._fnc(m, 'DIV');
	}

	mod(m) {
		return this._fnc(m, 'MOD');
	}

	det() {
		return numeric.det(this.values);
	}

	inv() {
		const inverse = numeric.inv(this.values);
		if (inverse && inverse[0] && isFinite(inverse[0][0])) {
			return new Matrix(inverse);
		}
		throw new Error('Matrix: There is no inverse of this matrix');
	}

	equal(matrix) {
		if (!(matrix instanceof Matrix)) {
			throw new TypeError(`Matrix: Parameter matrix in ${type} has to be a vector.`);
		}
		if (this.dimX() !== matrix.dimX() || this.dimY() !== matrix.dimY()) {
			throw new TypeError(`Matrix: Can only ${type} matrix with the same dimensions.`);
		}
		return _.isEqual(this.values, matrix.values);
	}

	transpose() {
		const tMatrix = new Matrix(_.unzip(this.values));
		tMatrix._dimX = this.dimY();
		tMatrix._dimY = this.dimX();
		return tMatrix;
	}

	copy() {
		return _.cloneDeep(this);
	}

	dimX() {
		return this._dimX;
	}

	dimY() {
		return this._dimY;
	}

	sum() {
		return Utils.sum(this.values);
	}

	random(params = {min: 0, max: 1}) {
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach((value, j) => {
				values[i][j] = chance.floating(params);
			});
		});
		return new Matrix(values);
	}

	diag(number) {
		if (typeof number !== 'number') {
			throw new TypeError("Matrix: Parameter number in offset has to be a number.");
		}
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach((value, j) => {
				if (i === j) {
					values[i].push(number);
				} else {
					values[i].push(0);
				}
			});
		});
		return new Matrix(values);
	}

	toVectors() {
		return this.transpose().values.map(row => new Vector(row));
	}

	fill(number) {
		if (typeof number !== 'number') {
			throw new TypeError("Matrix: Parameter number in offset has to be a number.");
		}
		const values = [];
		this.values.forEach((row, i) => {
			values.push([]);
			row.forEach((value, j) => {
				values[i][j] = number;
			});
		});
		return new Matrix(values);
	}
}
