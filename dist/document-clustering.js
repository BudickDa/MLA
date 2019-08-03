'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentClustering = function () {
	function DocumentClustering(corpus) {
		var _this = this;

		var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
		var commonFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

		_classCallCheck(this, DocumentClustering);

		if (!_utils2.default.isStringArray(corpus)) {
			throw new TypeError('Parameter texts must be an array of strings.');
		}
		/**
   * Find n the most used words in the corpus to create bag of words
   */
		var text = _text2.default.normalize(corpus.join(' '));
		this.language = _text2.default.languageDetect(text);
		var words = _text2.default.filterStopwords(_text2.default.wordTokenizer(text), this.language);
		var stemmedWords = words.map(function (w) {
			return _text2.default.stemmer(w, _this.language);
		});

		var wordCount = _text2.default.wordCounter(stemmedWords);
		var values = _underscore2.default.values(wordCount);
		if (n < values.length) {
			/**
    * Weights common words heigher if weight === 'common'.
    * Default is that rare words are more important.
    */
			if (commonFirst) {
				values.sort(function (a, b) {
					return b - a;
				});
			} else {
				values.sort(function (a, b) {
					return a - b;
				});
			}
			var pivot = values[n];
			this.words = [];
			_underscore2.default.forEach(wordCount, function (value, word) {
				/**
     * Add word as long as words is smaller n and the value of the word greater than the pivot.
     */
				if (value >= pivot && _this.words.length < n) {
					_this.words.push(word);
				}
			});
		} else {
			this.words = _underscore2.default.unique(stemmedWords);
		}
		this.vectors = [];
		this.ready = this.load(corpus);
	}

	_createClass(DocumentClustering, [{
		key: 'load',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(corpus) {
				var i, vector;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.t0 = regeneratorRuntime.keys(corpus);

							case 1:
								if ((_context.t1 = _context.t0()).done) {
									_context.next = 9;
									break;
								}

								i = _context.t1.value;
								_context.next = 5;
								return _text2.default.createBagOfWords(corpus[i], this.words);

							case 5:
								vector = _context.sent;

								this.vectors.push(vector);
								_context.next = 1;
								break;

							case 9:
								return _context.abrupt('return', true);

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function load(_x3) {
				return _ref.apply(this, arguments);
			}

			return load;
		}()
	}, {
		key: '_findCenters',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(k) {
				var _this2 = this;

				var _ret;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.ready;

							case 2:
								if (!_context2.sent) {
									_context2.next = 6;
									break;
								}

								_ret = function () {
									var centers = [];
									centers.push(_this2.vectors[0]);

									var _loop = function _loop(i) {
										var maxDistance = 0;
										var bestIndex = -1;
										_this2.vectors.forEach(function (vector, index) {
											var distances = [];
											centers.forEach(function (center) {
												if (!center) {
													console.log(_this2.vectors[0]);
													console.log(center);
												}
												distances.push(vector.euclideanDistance(center));
											});
											var meanDistance = _utils2.default.mean(distances);
											if (maxDistance < meanDistance && centers.indexOf(vector) === -1) {
												maxDistance = meanDistance;
												bestIndex = index;
											}
										});
										centers.push(_this2.vectors[bestIndex]);
									};

									for (var i = k - 1; i > 0; i--) {
										_loop(i);
									}
									return {
										v: centers
									};
								}();

								if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
									_context2.next = 6;
									break;
								}

								return _context2.abrupt('return', _ret.v);

							case 6:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function findCenters(_x4) {
				return _ref2.apply(this, arguments);
			}

			return findCenters;
		}()
	}, {
		key: 'cluster',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				var k = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
				var centers = arguments[1];
				var clusters;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.ready;

							case 2:
								if (!_context3.sent) {
									_context3.next = 18;
									break;
								}

								if (centers) {
									_context3.next = 7;
									break;
								}

								_context3.next = 6;
								return this._findCenters(k);

							case 6:
								centers = _context3.sent;

							case 7:
								clusters = [];

								centers.forEach(function (center) {
									clusters.push([]);
								});
								_context3.next = 11;
								return this.ready;

							case 11:
								if (!_context3.sent) {
									_context3.next = 18;
									break;
								}

								if (Array.isArray(centers)) {
									_context3.next = 16;
									break;
								}

								_context3.next = 15;
								return this._findCenters(k);

							case 15:
								centers = _context3.sent;

							case 16:
								this.vectors.forEach(function (vector) {
									var minDistance = Infinity;
									var bestIndex = -1;
									centers.forEach(function (center, index) {
										var distance = vector.euclideanDistance(center);
										if (minDistance > distance) {
											minDistance = distance;
											bestIndex = index;
										}
									});
									clusters[bestIndex].push(vector.label);
								});
								return _context3.abrupt('return', clusters);

							case 18:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function kNearestNeighbour() {
				return _ref3.apply(this, arguments);
			}

			return kNearestNeighbour;
		}()

		/**
   * Tests with training data
   * @param documents {}: Object with categories that contain arrays of trainingsdata
   * @returns {Promise.<void>}
   */

	}, {
		key: 'test',
		value: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
				var k = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
				var documents = arguments[1];
				var testCorpus, clusters, corrects, wrongs;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.ready;

							case 2:
								if (!_context4.sent) {
									_context4.next = 11;
									break;
								}

								testCorpus = _test2.default.constructCorpus(documents);
								_context4.next = 6;
								return this.cluster(k);

							case 6:
								clusters = _context4.sent;
								corrects = 0;
								wrongs = 0;

								clusters.forEach(function (cluster) {
									var categories = [];
									cluster.forEach(function (document) {
										categories.push(_test2.default.findCategory(document, documents));
									});
									var values = _underscore2.default.values(_text2.default.wordCounter(categories));
									corrects += _underscore2.default.max(values);
									wrongs += _utils2.default.sum(values) - _underscore2.default.max(values);
								});
								return _context4.abrupt('return', wrongs / (corrects + wrongs) * 100);

							case 11:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function test() {
				return _ref4.apply(this, arguments);
			}

			return test;
		}()
	}]);

	return DocumentClustering;
}();

exports.default = DocumentClustering;