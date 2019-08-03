'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _numeric = require('numeric');

var _numeric2 = _interopRequireDefault(_numeric);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

var _matrix = require('./matrix');

var _matrix2 = _interopRequireDefault(_matrix);

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, null, [{
		key: 'mean',

		/**
   * Calculate mean out of array
   * @param array
   * @returns {number}
   */
		value: function mean(array) {
			if (!Utils.isNumberArray(array)) {
				throw new TypeError('Parameter of mean must be an array of numbers.');
			}
			var length = array.length || 1;
			return Utils.sum(array) / length;
		}

		/**
   * Calculates the mean vector out of an vector array
   * @param array
   * @returns {number}
   */

	}, {
		key: 'meanVector',
		value: function meanVector(array) {
			if (!Utils.isVectorArray(array)) {
				throw new TypeError('Parameter of meanVector must be an array of Vectors.');
			}
			var dimension = array[0].dim();
			var sum = array.reduce(function (a, b) {
				return a.add(b);
			}, new _vector2.default(dimension));
			var length = array.length || 1;
			return sum.scalar(1 / length);
		}

		/**
   * Calcualte standard deviation
   * @param array
   * @returns {number}
   */

	}, {
		key: 'variance',
		value: function variance(array) {
			if (!Utils.isNumberArray(array)) {
				throw new TypeError('Parameter of deviation must be an array of numbers.');
			}
			var mean = Utils.mean(array);
			var variance = 0;
			array.forEach(function (v) {
				variance += Math.pow(v - mean, 2);
			});
			return variance / (array.length || 1);
		}
	}, {
		key: 'standardDeviation',
		value: function standardDeviation(array) {
			if (!Utils.isNumberArray(array)) {
				throw new TypeError('Parameter of deviation must be an array of numbers.');
			}
			return Math.sqrt(Utils.deviationSquared(array));
		}
	}, {
		key: 'varianceVector',
		value: function varianceVector(array) {
			if (!Utils.isVectorArray(array)) {
				throw new TypeError('Parameter of deviationVectors must be an array of Vectors.');
			}
			var varianceVector = new _vector2.default(array.length);
			var meanVector = Utils.meanVector(array);
			array.forEach(function (vector, i) {
				vector.values.forEach(function (n, j) {
					varianceVector.setValue(i, varianceVector.getValue(i) + Math.pow(vector.getValue(i) - meanVector.getValue(i), 2));
				});
			});
			var length = meanVector.dim() || 1;
			return varianceVector.scalar(1 / length);
		}
	}, {
		key: 'standardDeviationVector',
		value: function standardDeviationVector(array) {
			if (!Utils.isVectorArray(array)) {
				throw new TypeError('Parameter of deviationVectors must be an array of Vectors.');
			}
			var varianceVector = Utils.varianceVector(array);
			varianceVector.values.forEach(function (value, index) {
				varianceVector.setValue(index, Math.sqrt(varianceVector.getValue(i) / vectors.length));
			});
			return varianceVector;
		}

		/**
   * Applies softmax to an array
   * @param array
   */

	}, {
		key: 'softmax',
		value: function softmax(array) {
			if (!Utils.isNumberArray(array)) {
				throw new TypeError('Parameter of softmax must be an array of numbers.');
			}
			var exponents = array.map(Math.exp);
			var sum = Utils.sum(exponents);
			return exponents.map(function (e) {
				return e / sum;
			});
		}

		/**
   * Calculate sum of array
   * (wrapper around lodash _.sum)
   * @param array
   */

	}, {
		key: 'sum',
		value: function sum(array) {
			if (array instanceof _matrix2.default || array instanceof _vector2.default) {
				array = array.values;
			}
			array = _lodash2.default.flattenDeep(array);
			if (!Utils.isNumberArray(array)) {
				throw new TypeError('Parameter of sum must be an array of numbers');
			}
			return _lodash2.default.sum(array);
		}
	}, {
		key: 'kMostDistant',
		value: function kMostDistant(array, k) {
			if (!Utils.isVectorArray) {
				throw new TypeError('Parameter of mostDistant must be an array of Vectors.');
			}
			var results = [];
			results.push(array[0]);
			if (array.length > 1) {
				var _loop = function _loop(_i) {
					var maxDistance = 0;
					var bestIndex = -1;
					array.forEach(function (vector, index) {
						var distances = [];
						results.forEach(function (center) {
							distances.push(vector.euclideanDistance(center));
						});
						var meanDistance = Utils.mean(distances);
						if (maxDistance < meanDistance && results.indexOf(vector) === -1) {
							maxDistance = meanDistance;
							bestIndex = index;
						}
					});
					results.push(array[bestIndex]);
				};

				for (var _i = k - 1; _i > 0; _i--) {
					_loop(_i);
				}
			}
			return results;
		}
	}, {
		key: 'multivariantGaussian',
		value: function multivariantGaussian(vector, mean, sigma) {
			if (Array.isArray(vector)) {
				vector = new _vector2.default(vector);
			}
			if (Array.isArray(mean)) {
				mean = new _vector2.default(mean);
			}
			if (Array.isArray(sigma)) {
				sigma = new _matrix2.default(sigma);
			}

			if (mean.dim() !== sigma.dimX()) {
				throw new RangeError('Mean and sigma must have same dimension');
			}
			var k = mean.dim();
			var determinante = sigma.det();

			var inverseSigma = new _matrix2.default(k, k);
			var coefficient = 0;
			try {
				inverseSigma = sigma.inv();
				coefficient = 1 / (Math.pow(Utils.sqrt2PI, k) * Math.sqrt(determinante));
			} catch (e) {}
			var delta = vector.subtract(mean);
			var p = 0;
			inverseSigma.values.forEach(function (itemInverseSigma, indexInverseSigma) {
				var sum = 0;
				delta.values.forEach(function (itemDelta, indexDelta) {
					sum += itemInverseSigma[indexDelta] * itemDelta;
				});
				p += delta.getValue(indexInverseSigma) * sum;
			});
			return Math.round(coefficient * Math.exp(p / -2)).toFixed(Utils.len);
		}
	}, {
		key: 'isStringArray',
		value: function isStringArray(array) {
			return Array.isArray(array) && array.length > 0 && array.every(function (s) {
				return typeof s === 'string';
			});
		}
	}, {
		key: 'isVectorArray',
		value: function isVectorArray(array) {
			return Array.isArray(array) && array.length > 0 && array.every(function (s) {
				return s instanceof _vector2.default;
			});
		}
	}, {
		key: 'isNumberArray',
		value: function isNumberArray(array) {
			return Array.isArray(array) && array.length > 0 && array.every(function (s) {
				return typeof s === 'number';
			});
		}
	}, {
		key: 'getSigma',
		value: function getSigma(matrix) {
			return _numeric2.default.diag(_numeric2.default.rep([matrix.dimX()], _numeric2.default.epsilon));
		}
	}, {
		key: 'getWeights',
		value: function getWeights(clusters) {
			var classes = [];
			var weights = Utils.softmax(clusters.map(function (c) {
				return c.length;
			}));
			clusters.forEach(function (cluster, index) {
				classes.push(new _class2.default(weights[index], Utils.meanVector(cluster), Utils.getSigma(new _matrix2.default(cluster))));
			});
			return weights;
		}
	}]);

	return Utils;
}();

exports.default = Utils;


Utils.sqrt2PI = 2.50662827463;
Utils.len = Math.ceil(Math.log(Utils.sqrt2PI + 1) / Math.LN10);