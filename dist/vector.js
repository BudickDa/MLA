"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
	function Vector(valuesOrDimension, label) {
		_classCallCheck(this, Vector);

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

	_createClass(Vector, [{
		key: "setValue",
		value: function setValue(index, value) {
			if (typeof index !== "number") {
				throw TypeError("Index has to be a number.");
			}
			if (index >= this.values.length) {
				throw RangeError("Index out of bounds: " + index + ", max: " + (this.values.length - 1));
			}
			this.values[index] = value;
		}
	}, {
		key: "getValue",
		value: function getValue(index) {
			if (typeof index !== "number") {
				throw TypeError("Index has to be a number.");
			}
			if (index >= this.values.length) {
				throw RangeError("Index out of bounds: " + index + ", max: " + (this.values.length - 1));
			}
			return this.values[index];
		}

		/**
   * Multiply values by number
   * @param number
   * @returns {Vector}
   */

	}, {
		key: "scalar",
		value: function scalar(number) {
			if (typeof number !== 'number') {
				throw new TypeError("Vector: Parameter number in scalar has to be a number.");
			}
			var values = [];
			this.values.forEach(function (value, index) {
				values.push(value * number);
			});
			return new Vector(values);
		}

		/**
   * Offset values by number
   * @param number
   * @returns {Vector}
   */

	}, {
		key: "offset",
		value: function offset(number) {
			if (typeof number !== 'number') {
				throw new TypeError("Vector: Parameter number in offset has to be a number.");
			}
			var values = [];
			this.values.forEach(function (value, index) {
				values.push(value + number);
			});
			return new Vector(values);
		}
	}, {
		key: "square",
		value: function square() {
			var values = [];
			this.values.forEach(function (value, index) {
				values.push(value * value);
			});
			return new Vector(values);
		}
	}, {
		key: "add",
		value: function add(vector) {
			if (!(vector instanceof Vector)) {
				throw new TypeError("Vector: Parameter vector in add has to be a vector.");
			}
			if (this.values.length !== vector.length()) {
				throw new TypeError("Vector: Can only add vectors with the same dimensions.");
			}
			var values = [];
			this.values.forEach(function (value, index) {
				values.push(value + vector.getValue(index));
			});
			return new Vector(values);
		}
	}, {
		key: "subtract",
		value: function subtract(vector) {
			if (!(vector instanceof Vector)) {
				throw new TypeError("Vector: Parameter vector in add has to be a vector.");
			}
			if (this.values.length !== vector.length()) {
				throw new TypeError("Vector: Can only add vectors with the same dimensions.");
			}
			var values = [];
			this.values.forEach(function (value, index) {
				values.push(value - vector.getValue(index));
			});
			return new Vector(values);
		}
	}, {
		key: "euclideanDistance",
		value: function euclideanDistance(vector) {
			if (!(vector instanceof Vector)) {
				throw new TypeError("Vector: Parameter has to be a vector.");
			}
			if (this.values.length !== vector.length()) {
				throw new TypeError("Vector: Can only calculate distance between vectors with the same dimensions.");
			}
			var sum = 0;
			this.values.forEach(function (value, index) {
				sum += Math.pow(value - vector.getValue(index), 2);
			});
			return Math.sqrt(sum);
		}
	}, {
		key: "forEach",
		value: function forEach(cb) {
			this.values.forEach(cb);
		}
	}, {
		key: "gaussianDistance",
		value: function gaussianDistance(vector) {
			if (!(vector instanceof Vector)) {
				throw new TypeError("Vector: Parameter of gaussianDistance has to be a vector.");
			}
			if (this.values.length !== vector.length()) {
				throw new TypeError("Vector: Can only calculate gaussian distance between vectors with the same dimensions.");
			}
		}
	}, {
		key: "equal",
		value: function equal(vector) {
			if (!(vector instanceof Vector)) {
				throw new TypeError("Vector: Parameter has to be a vector.");
			}
			if (this.values.length !== vector.length()) {
				throw new TypeError("Vector: Can only calculate distance between vectors with the same dimensions.");
			}
			return _lodash2.default.isEqual(this.values, vector.values);
		}
	}, {
		key: "length",
		value: function length() {
			return this.values.length;
		}
	}, {
		key: "dim",
		value: function dim() {
			return this.length();
		}
	}, {
		key: "fill",
		value: function fill(value) {
			this.values.fill(value);
		}
	}]);

	return Vector;
}();

exports.default = Vector;