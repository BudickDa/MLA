export default class Utils {
	/**
	 * Calculate mean out of array
	 * @param array
	 * @returns {number}
	 */
	static mean(array) {
		if (!Utils.isSNumberArray(array)) {
			throw new TypeError('Parameter of mean must be an array of numbers.');
		}
		const sum = array.reduce((a, b) => a + b, 0);
		const length = array.length || 1;
		return sum / length;
	}

	/**
	 * Calcualte standard deviation
	 * @param array
	 * @returns {number}
	 */
	static deviation(array) {
		if (!Utils.isSNumberArray(array)) {
			throw new TypeError('Parameter of deviation must be an array of numbers.');
		}
		const mean = Helpers.mean(array);
		let deviation = 0;
		array.forEach(v => {
			deviation += Math.pow(parseInt(v) - mean, 2);
		});
		return Math.sqrt(deviation / (array.length || 1));
	}

	/**
	 * Applies softmax to an array
	 * @param array
	 */
	static softmax(array) {
		if (!Utils.isSNumberArray(array)) {
			throw new TypeError('Parameter of softmax must be an array of numbers.');
		}
		const exponents = array.map(Math.exp);
		const sum = Utils.sum(exponents);
		return exponents.map(e => e / sum);
	}

	/**
	 * Calculate sum of array
	 * @param array
	 */
	static sum(array) {
		if (!Utils.isSNumberArray(array)) {
			throw new TypeError('Parameter of sum must be an array of numbers');
		}
		return array.reduce((memo, val) => {
			return memo + val;
		});
	}

	static isStringArray(array) {
		return Array.isArray(array) && array.every(s => typeof s === 'string');
	}

	static isSNumberArray(array) {
		return Array.isArray(array) && array.every(s => typeof s === 'number');
	}
}
