"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classifier = require("./classifier");

var _classifier2 = _interopRequireDefault(_classifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gaussian = function (_Classifier) {
	_inherits(Gaussian, _Classifier);

	function Gaussian() {
		var vectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		_classCallCheck(this, Gaussian);

		return _possibleConstructorReturn(this, (Gaussian.__proto__ || Object.getPrototypeOf(Gaussian)).call(this, vectors, labels));
	}

	_createClass(Gaussian, [{
		key: "classify",
		value: function classify(vector) {
			if (this.labels.length === 0 || this.vectors.length === 0) {
				throw new Error("Please train your classifier first.");
			}
			if (vector.length() !== this.vectors[0].length()) {
				throw new Error("Vector has to has the same dimension as trainings data.");
			}

			var bestDistance = Infinity;
			var bestIndex = -1;
			this.vectors.forEach(function (referenceVector, index) {
				var distance = vector.euclideanDistance(referenceVector);
				if (distance < bestDistance) {
					bestDistance = distance;
					bestIndex = index;
				}
			});
			return this.labels[bestIndex];
		}
	}]);

	return Gaussian;
}(_classifier2.default);

exports.default = Gaussian;