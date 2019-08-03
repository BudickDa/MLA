'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _test = require('../test');

var _test2 = _interopRequireDefault(_test);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _expectationMaximazation = require('../algorythm/expectation-maximazation');

var _expectationMaximazation2 = _interopRequireDefault(_expectationMaximazation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentClustering = function () {
	/**
  *
  * @param corpus
  * @param n
  * @param commonFirst
  * @param algorythm {EM|KMeans|KNearestNeighbour}
  */
	function DocumentClustering(corpus) {
		var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

		var _this = this;

		var commonFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
		var Algorythm = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _expectationMaximazation2.default;

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
		var values = _lodash2.default.values(wordCount);
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
			_lodash2.default.forEach(wordCount, function (value, word) {
				/**
     * Add word as long as words is smaller n and the value of the word greater than the pivot.
     */
				if (value >= pivot && _this.words.length < n) {
					_this.words.push(word);
				}
			});
		} else {
			this.words = _lodash2.default.uniq(stemmedWords);
		}
		this.vectors = [];
		this.centers = [];
		this.trainingsData = [];
		this.ready = this.load(corpus);
		this.algorythm = new Algorythm();
	}

	_createClass(DocumentClustering, [{
		key: 'train',
		value: function train(documents) {
			this.trainingsData = _lodash2.default.cloneDeep(documents);
			this.trained = this.trainAsync(documents);
		}
	}, {
		key: 'trainAsync',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(documents) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.ready;

							case 2:
								if (!_context.sent) {
									_context.next = 11;
									break;
								}

								_context.next = 5;
								return this.cluster(documents);

							case 5:
								this.clusters = _context.sent;
								_context.next = 8;
								return this.test(this.clusters, this.trainingsData);

							case 8:
								_context.t0 = _context.sent;
								this.accuracy = 100 - _context.t0;
								return _context.abrupt('return', true);

							case 11:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function trainAsync(_x4) {
				return _ref.apply(this, arguments);
			}

			return trainAsync;
		}()
	}, {
		key: 'load',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(corpus) {
				var i, vector;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.t0 = regeneratorRuntime.keys(corpus);

							case 1:
								if ((_context2.t1 = _context2.t0()).done) {
									_context2.next = 9;
									break;
								}

								i = _context2.t1.value;
								_context2.next = 5;
								return _text2.default.createBagOfWords(corpus[i], this.words);

							case 5:
								vector = _context2.sent;

								this.vectors.push(vector);
								_context2.next = 1;
								break;

							case 9:
								return _context2.abrupt('return', true);

							case 10:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function load(_x5) {
				return _ref2.apply(this, arguments);
			}

			return load;
		}()
	}, {
		key: 'cluster',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				var k = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
				var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								if (!(!this.algorythm || !this.algorythm.cluster)) {
									_context3.next = 2;
									break;
								}

								throw new TypeError('Please supply the algorythm that should be used. Possibilities are: EM, KMeans or KNearestNeighbour');

							case 2:
								return _context3.abrupt('return', this.algorythm.cluster(this.vectors, k, iterations));

							case 3:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function cluster() {
				return _ref3.apply(this, arguments);
			}

			return cluster;
		}()
	}, {
		key: 'classify',
		value: function classify(vector) {
			var maxProbability = -1;
			var bestIndex = -1;
			this.algorythm.classes.forEach(function (c, index) {
				var probability = c.getProbability(vector);
				console.log(probability, maxProbability);
				if (maxProbability < probability) {
					maxProbability = probability;
					bestIndex = index;
				}
			});
			return { index: bestIndex, probability: maxProbability };
		}
	}, {
		key: 'test',


		/**
   * Tests with training data
   * @param documents {}: Object with categories that contain arrays of trainingsdata
   * @param clusters {}: optinal object to test a clustered object and not use internal cluster method (is used to test this function)
   * @returns {Promise.<void>}
   */
		value: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(clusters, documents) {
				var ready, loaded;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.ready;

							case 2:
								ready = _context4.sent;
								_context4.next = 5;
								return this.trained;

							case 5:
								loaded = _context4.sent;

								if (!(ready && loaded)) {
									_context4.next = 8;
									break;
								}

								return _context4.abrupt('return', _test2.default.testCluster(clusters, documents));

							case 8:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function test(_x8, _x9) {
				return _ref4.apply(this, arguments);
			}

			return test;
		}()
	}], [{
		key: 'classify',
		value: function classify(vector, classes) {
			var maxProbability = -1;
			var bestIndex = -1;
			classes.forEach(function (c, index) {
				var probability = c.getProbability(vector);
				if (maxProbability < probability) {
					maxProbability = probability;
					bestIndex = index;
				}
			});
			return { index: bestIndex, probability: maxProbability };
		}
	}]);

	return DocumentClustering;
}();

exports.default = DocumentClustering;