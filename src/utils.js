import _ from 'lodash';
import numeric from 'numeric';
import Vector from './vector';
import Matrix from './matrix';
import Class from './class';

export default class Utils {
	/**
	 * Calculate mean out of array
	 * @param array
	 * @returns {number}
	 */
	static mean(array) {
		if (!Utils.isNumberArray(array)) {
			throw new TypeError('Parameter of mean must be an array of numbers.');
		}
		const length = array.length || 1;
		return Utils.sum(array) / length;
	}


	/**
	 * Calculates the mean vector out of an vector array
	 * @param array
	 * @returns {number}
	 */
	static meanVector(array) {
		if (!Utils.isVectorArray(array)) {
			throw new TypeError('Parameter of meanVector must be an array of Vectors.');
		}
		const dimension = array[0].dim();
		const sum = array.reduce((a, b) => a.add(b), new Vector(dimension));
		const length = array.length || 1;
		return sum.scalar(1 / length);
	}

	/**
	 * Calcualte standard deviation
	 * @param array
	 * @returns {number}
	 */
	static variance(array) {
		if (!Utils.isNumberArray(array)) {
			throw new TypeError('Parameter of deviation must be an array of numbers.');
		}
		const mean = Utils.mean(array);
		let variance = 0;
		array.forEach(v => {
			variance += Math.pow(v - mean, 2);
		});
		return variance / (array.length || 1);
	}

	static standardDeviation(array) {
		if (!Utils.isNumberArray(array)) {
			throw new TypeError('Parameter of deviation must be an array of numbers.');
		}
		return Math.sqrt(Utils.deviationSquared(array));
	}

	static varianceVector(array) {
		if (!Utils.isVectorArray(array)) {
			throw new TypeError('Parameter of deviationVectors must be an array of Vectors.');
		}
		const varianceVector = new Vector(array.length);
		const meanVector = Utils.meanVector(array);
		array.forEach((vector, i) => {
			vector.values.forEach((n, j) => {
				varianceVector.setValue(i, varianceVector.getValue(i) + Math.pow(vector.getValue(i) - meanVector.getValue(i), 2));
			});
		});
		const length = (meanVector.dim() || 1);
		return varianceVector.scalar(1 / length);
	}

	static standardDeviationVector(array) {
		if (!Utils.isVectorArray(array)) {
			throw new TypeError('Parameter of deviationVectors must be an array of Vectors.');
		}
		const varianceVector = Utils.varianceVector(array)
		varianceVector.values.forEach((value, index) => {
			varianceVector.setValue(index, Math.sqrt(varianceVector.getValue(i) / vectors.length))
		});
		return varianceVector;
	}

	/**
	 * Applies softmax to an array
	 * @param array
	 */
	static softmax(array) {
		if (!Utils.isNumberArray(array)) {
			throw new TypeError('Parameter of softmax must be an array of numbers.');
		}
		const exponents = array.map(Math.exp);
		const sum = Utils.sum(exponents);
		return exponents.map(e => e / sum);
	}

	/**
	 * Calculate sum of array
	 * (wrapper around lodash _.sum)
	 * @param array
	 */
	static sum(array) {
		if (array instanceof Matrix || array instanceof Vector) {
			array = array.values;
		}
		array = _.flattenDeep(array);
		if (!Utils.isNumberArray(array)) {
			throw new TypeError('Parameter of sum must be an array of numbers');
		}
		return _.sum(array);
	}

	static kMostDistant(array, k) {
		if (!Utils.isVectorArray) {
			throw new TypeError('Parameter of mostDistant must be an array of Vectors.');
		}
		const results = [];
		results.push(array[0]);
		if (array.length > 1) {
			for (let i = k - 1; i > 0; i--){
				let maxDistance = 0;
				let bestIndex = -1;
				array.forEach((vector, index) => {
					const distances = [];
					results.forEach(center => {
						distances.push(vector.euclideanDistance(center));
					});
					const meanDistance = Utils.mean(distances);
					if (maxDistance < meanDistance && results.indexOf(vector) === -1) {
						maxDistance = meanDistance;
						bestIndex = index;
					}
				});
				results.push(array[bestIndex]);
			}
		}
		return results;
	}

	static multivariantGaussian(vector, mean, sigma) {
		if (Array.isArray(vector)) {
			vector = new Vector(vector);
		}
		if (Array.isArray(mean)) {
			mean = new Vector(mean);
		}
		if (Array.isArray(sigma)) {
			sigma = new Matrix(sigma);
		}

		if (mean.dim() !== sigma.dimX()) {
			throw new RangeError('Mean and sigma must have same dimension');
		}
		const k = mean.dim();
		const determinante = sigma.det();

		let inverseSigma = new Matrix(k, k);
		let coefficient = 0;
		try{
			inverseSigma = sigma.inv();
			coefficient = 1 / (Math.pow(Utils.sqrt2PI, k) * Math.sqrt(determinante));
		}catch(e){}
		const delta = vector.subtract(mean);
		let p = 0;
		inverseSigma.values.forEach((itemInverseSigma, indexInverseSigma) => {
			let sum = 0;
			delta.values.forEach((itemDelta, indexDelta) => {
				sum += itemInverseSigma[indexDelta] * itemDelta;
			});
			p += delta.getValue(indexInverseSigma) * sum;
		});
		return Math.round(coefficient * Math.exp(p / -2)).toFixed(Utils.len);
	}

	static  isStringArray(array) {
		return Array.isArray(array) && array.length > 0 && array.every(s => typeof s === 'string');
	}

	static  isVectorArray(array) {
		return Array.isArray(array) && array.length > 0 && array.every(s => s instanceof Vector);
	}

	static  isNumberArray(array) {
		return Array.isArray(array) && array.length > 0 && array.every(s => typeof s === 'number');
	}

	static getSigma(matrix) {
		return numeric.diag(numeric.rep([matrix.dimX()], numeric.epsilon));
	}

	static getWeights(clusters) {
		const classes = [];
		const weights = Utils.softmax(clusters.map(c => c.length));
		clusters.forEach((cluster, index) => {
			classes.push(new Class(weights[index], Utils.meanVector(cluster), Utils.getSigma(new Matrix(cluster))));
		});
		return weights;
	}


}

Utils.sqrt2PI = 2.50662827463;
Utils.len = Math.ceil(Math.log(Utils.sqrt2PI + 1) / Math.LN10);
