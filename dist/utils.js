'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
			if (!Utils.isSNumberArray(array)) {
				throw new TypeError('Parameter of mean must be an array of numbers.');
			}
			var sum = array.reduce(function (a, b) {
				return a + b;
			}, 0);
			var length = array.length || 1;
			return sum / length;
		}

		/**
   * Calcualte standard deviation
   * @param array
   * @returns {number}
   */

	}, {
		key: 'deviation',
		value: function deviation(array) {
			if (!Utils.isSNumberArray(array)) {
				throw new TypeError('Parameter of deviation must be an array of numbers.');
			}
			var mean = Helpers.mean(array);
			var deviation = 0;
			array.forEach(function (v) {
				deviation += Math.pow(parseInt(v) - mean, 2);
			});
			return Math.sqrt(deviation / (array.length || 1));
		}

		/**
   * Applies softmax to an array
   * @param array
   */

	}, {
		key: 'softmax',
		value: function softmax(array) {
			if (!Utils.isSNumberArray(array)) {
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
   * @param array
   */

	}, {
		key: 'sum',
		value: function sum(array) {
			if (!Utils.isSNumberArray(array)) {
				throw new TypeError('Parameter of sum must be an array of numbers');
			}
			return array.reduce(function (memo, val) {
				return memo + val;
			});
		}
	}, {
		key: 'isStringArray',
		value: function isStringArray(array) {
			return Array.isArray(array) && array.every(function (s) {
				return typeof s === 'string';
			});
		}
	}, {
		key: 'isSNumberArray',
		value: function isSNumberArray(array) {
			return Array.isArray(array) && array.every(function (s) {
				return typeof s === 'number';
			});
		}
	}]);

	return Utils;
}();

exports.default = Utils;