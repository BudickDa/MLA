import _ from 'lodash';

export default class Vector {
	constructor(valuesOrDimension, label) {
		if (Array.isArray(valuesOrDimension)) {
			this.values = valuesOrDimension;
		} else if (typeof valuesOrDimension === "number") {
			this.values = Array.apply(null, Array(valuesOrDimension)).map(Number.prototype.valueOf, 0);
		} else {
			throw TypeError("Parameter of vector constructor has to be an array or a number");
		}
		if (typeof label === 'string') {
			this.label = label;
		}
	}

	setValue(index, value) {
		if (typeof index !== "number") {
			throw TypeError("Index has to be a number.");
		}
		if (index >= this.values.length) {
			throw RangeError(`Index out of bounds: ${index}, max: ${this.values.length - 1}`);
		}
		this.values[index] = value;
	}

	getValue(index) {
		if (typeof index !== "number") {
			throw TypeError("Index has to be a number.");
		}
		if (index >= this.values.length) {
			throw RangeError(`Index out of bounds: ${index}, max: ${this.values.length - 1}`);
		}
		return this.values[index];
	}

	/**
	 * Multiply values by number
	 * @param number
	 * @returns {Vector}
	 */
	scalar(number) {
		if (typeof number !== 'number') {
			throw new TypeError("Vector: Parameter number in scalar has to be a number.");
		}
		const values = [];
		this.values.forEach((value, index) => {
			values.push(value * number);
		});
		return new Vector(values);
	}


	/**
	 * Offset values by number
	 * @param number
	 * @returns {Vector}
	 */
	offset(number) {
		if (typeof number !== 'number') {
			throw new TypeError("Vector: Parameter number in offset has to be a number.");
		}
		const values = [];
		this.values.forEach((value, index) => {
			values.push(value + number);
		});
		return new Vector(values);
	}

	square() {
		const values = [];
		this.values.forEach((value, index) => {
			values.push(value * value);
		});
		return new Vector(values);
	}

	add(vector) {
		if (!(vector instanceof Vector)) {
			throw new TypeError("Vector: Parameter vector in add has to be a vector.");
		}
		if (this.values.length !== vector.length()) {
			throw new TypeError("Vector: Can only add vectors with the same dimensions.");
		}
		const values = [];
		this.values.forEach((value, index) => {
			values.push(value + vector.getValue(index));
		});
		return new Vector(values);
	}

	subtract(vector) {
		if (!(vector instanceof Vector)) {
			throw new TypeError("Vector: Parameter vector in add has to be a vector.");
		}
		if (this.values.length !== vector.length()) {
			throw new TypeError("Vector: Can only add vectors with the same dimensions.");
		}
		const values = [];
		this.values.forEach((value, index) => {
			values.push(value - vector.getValue(index));
		});
		return new Vector(values);
	}

	euclideanDistance(vector) {
		if (!(vector instanceof Vector)) {
			throw new TypeError("Vector: Parameter has to be a vector.");
		}
		if (this.values.length !== vector.length()) {
			throw new TypeError("Vector: Can only calculate distance between vectors with the same dimensions.");
		}
		let sum = 0;
		this.values.forEach((value, index) => {
			sum += Math.pow(value - vector.getValue(index), 2);
		});
		return Math.sqrt(sum);
	}

	forEach(cb){
		this.values.forEach(cb);
	}

	gaussianDistance(vector) {
		if (!(vector instanceof Vector)) {
			throw new TypeError("Vector: Parameter of gaussianDistance has to be a vector.");
		}
		if (this.values.length !== vector.length()) {
			throw new TypeError("Vector: Can only calculate gaussian distance between vectors with the same dimensions.");
		}
	}

	equal(vector){
		if (!(vector instanceof Vector)) {
			throw new TypeError("Vector: Parameter has to be a vector.");
		}
		if (this.values.length !== vector.length()) {
			throw new TypeError("Vector: Can only calculate distance between vectors with the same dimensions.");
		}
		return _.isEqual(this.values, vector.values);
	}

	length() {
		return this.values.length;
	}

	dim() {
		return this.length();
	}

	fill(value) {
		this.values.fill(value);
	}
}
