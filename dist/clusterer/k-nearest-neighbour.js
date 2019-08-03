'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _documentClustering = require('./document-clustering');

var _documentClustering2 = _interopRequireDefault(_documentClustering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KNearestNeighbour = function (_DocumentClustering) {
	_inherits(KNearestNeighbour, _DocumentClustering);

	function KNearestNeighbour(corpus) {
		var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
		var commonFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

		_classCallCheck(this, KNearestNeighbour);

		return _possibleConstructorReturn(this, (KNearestNeighbour.__proto__ || Object.getPrototypeOf(KNearestNeighbour)).call(this, corpus, n, commonFirst));
	}

	_createClass(KNearestNeighbour, [{
		key: 'cluster',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var _this2 = this;

				var clusters;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.ready;

							case 2:
								_context.t0 = _context.sent;

								if (!_context.t0) {
									_context.next = 7;
									break;
								}

								_context.next = 6;
								return this.trained;

							case 6:
								_context.t0 = _context.sent;

							case 7:
								if (!_context.t0) {
									_context.next = 20;
									break;
								}

								clusters = [];

								this.centers.forEach(function (center) {
									clusters.push([]);
								});
								_context.next = 12;
								return this.ready;

							case 12:
								_context.t1 = _context.sent;

								if (!_context.t1) {
									_context.next = 17;
									break;
								}

								_context.next = 16;
								return this.trained;

							case 16:
								_context.t1 = _context.sent;

							case 17:
								if (!_context.t1) {
									_context.next = 20;
									break;
								}

								this.vectors.forEach(function (vector) {
									var minDistance = Infinity;
									var bestIndex = -1;
									_this2.centers.forEach(function (center, index) {
										var distance = vector.euclideanDistance(center);
										if (minDistance > distance) {
											minDistance = distance;
											bestIndex = index;
										}
									});
									clusters[bestIndex].push(vector.label);
								});
								return _context.abrupt('return', clusters);

							case 20:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function cluster() {
				return _ref.apply(this, arguments);
			}

			return cluster;
		}()
	}]);

	return KNearestNeighbour;
}(_documentClustering2.default);

exports.default = KNearestNeighbour;