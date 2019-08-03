'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _stemmer2 = require('stemmer');

var _stemmer3 = _interopRequireDefault(_stemmer2);

var _lancasterStemmer = require('lancaster-stemmer');

var _lancasterStemmer2 = _interopRequireDefault(_lancasterStemmer);

var _snowballGerman = require('snowball-german');

var _snowballGerman2 = _interopRequireDefault(_snowballGerman);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _stopwords = require('./res/stopwords');

var _stopwords2 = _interopRequireDefault(_stopwords);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
	function Text() {
		_classCallCheck(this, Text);
	}

	_createClass(Text, null, [{
		key: 'wordTokenizer',
		value: function wordTokenizer(text) {
			return text.match(/[\w\u00C0-\u00ff]+/gi);
		}
	}, {
		key: 'normalize',
		value: function normalize(text) {
			if (typeof text !== 'string') {
				throw new TypeError('Parameter text has to be a string');
			}
			return text.replace(/\n|\t/gi, '').replace(/\s+/gi, ' ').replace(/\d/gi, '%d');
		}
	}, {
		key: 'createBagOfWords',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(text, words, language) {
				var wordsOfText, values;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!(!(typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'string')) {
									_context.next = 2;
									break;
								}

								throw new TypeError('Text: Parameter text of createBagOfWords has to be a string');

							case 2:
								if (!language) {
									language = Text.languageDetect(text);
								}
								if (!_utils2.default.isStringArray(words)) {
									words = Text.wordTokenizer(text);
								}

								if (!(words.length === 0)) {
									_context.next = 6;
									break;
								}

								throw new TypeError('Text: text has to contain a least one word');

							case 6:
								words = words.map(function (w) {
									return w.toLowerCase();
								});
								wordsOfText = Text.wordTokenizer(text).map(function (word) {
									return Text.stemmer(word.toLowerCase(), language);
								});
								values = new Array(words.length).fill(0);

								wordsOfText.forEach(function (word) {
									var index = words.indexOf(word);
									if (index >= 0 && index < values.length) {
										values[index]++;
									}
								});
								return _context.abrupt('return', new _vector2.default(values, text));

							case 11:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function createBagOfWords(_x, _x2, _x3) {
				return _ref.apply(this, arguments);
			}

			return createBagOfWords;
		}()
	}, {
		key: 'sentenceTokenizer',
		value: function sentenceTokenizer(text) {
			text = text.replace(/\t/g, '').replace(/\n/g, ' ').replace(/[\s]{2,}/g, ' ').replace(/(\s-\s)[A-Z]/g, '. ');
			var sentences = text.replace(/(\s[A-z\u00C0-\u00ff']+\s[A-z\u00C0-\u00ff0-9']{2,})([\.+|\?|!])(\s[A-Z\u00C0-\u00DD[0-9]|w{3}|http])/g, '$1$2<split>$3').split('<split>').map(function (sentence) {
				return sentence.trim();
			});

			return _underscore2.default.uniq(sentences);
		}
	}, {
		key: 'languageDetect',
		value: function languageDetect(text) {
			if (typeof text !== 'string') {
				throw new TypeError('Parameter text in languageDetect must be a string.');
			}
			text = text.toLowerCase();
			var words = this.wordTokenizer(text);
			var index = [];
			var counts = [];

			var _loop = function _loop(language) {
				index.push(language);
				var count = 0;
				words.forEach(function (w) {
					_underscore2.default.contains(_stopwords2.default[language], w) ? count++ : '';
				});
				counts.push(count);
			};

			for (var language in _stopwords2.default) {
				_loop(language);
			}

			return index[counts.indexOf(_underscore2.default.max(counts))];
		}

		/**
   * Filters stopwords out of string or array of strings.
   * @param words {String|Array} Array of words or text.
   * @param language {String} Language (currently supported: de, en, es);
   */

	}, {
		key: 'filterStopwords',
		value: function filterStopwords(words, language) {
			if (typeof words === 'string') {
				words = Text.wordTokenizer(words);
			} else if (!_utils2.default.isStringArray(words)) {
				throw new TypeError('Parameter words in filterStopwords must be a string or an array of strings.');
			}
			if (!language) {
				language = Text.languageDetect(words.join(' '));
			}
			if (_stopwords2.default.hasOwnProperty(language)) {
				return words.filter(function (w) {
					return !_underscore2.default.contains(_stopwords2.default[language], w);
				});
			} else {
				throw new Error('No stopwords for language ' + language + '. Supported languages: de, en and es');
			}
		}
	}, {
		key: 'stemmer',
		value: function stemmer(word, language) {
			if (typeof word !== 'string') {
				throw new TypeError('Parameter word in stemmer must be a string.');
			}
			if (typeof language !== 'string') {
				throw new TypeError('Parameter language in stemmer must be a string.');
			}
			switch (language) {
				case 'en':
					word = (0, _stemmer3.default)(word);
					break;
				case 'de':
					word = (0, _snowballGerman2.default)(word);
					break;
				default:
					word = (0, _lancasterStemmer2.default)(word);
					break;
			}
			return word;
		}
	}, {
		key: 'wordCounter',
		value: function wordCounter(array) {
			var insensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			if (!_utils2.default.isStringArray(array)) {
				throw new TypeError('Text: Parameter array in wordCounter must be an array of string.');
			}
			if (insensitive) {
				array = array.map(function (w) {
					return w.toLowerCase();
				});
			}
			return _underscore2.default.chain(array).reduce(function (counts, word) {
				counts[word] = (counts[word] || 0) + 1;
				return counts;
			}, {}).value();
		}
	}, {
		key: 'levenshteinDistance',
		value: function levenshteinDistance(string, otherString) {
			if (string.length === 0) {
				return otherString.length;
			}
			if (otherString.length === 0) {
				return string.length;
			}
			var matrix = [];
			for (var i = 0; i <= otherString.length; i++) {
				matrix[i] = [i];
			}
			for (var j = 0; j <= string.length; j++) {
				matrix[0][j] = j;
			}
			for (var _i = 1; _i <= otherString.length; _i++) {
				for (var _j = 1; _j <= string.length; _j++) {
					if (otherString.charAt(_i - 1) === string.charAt(_j - 1)) {
						matrix[_i][_j] = matrix[_i - 1][_j - 1];
					} else {
						matrix[_i][_j] = Math.min(matrix[_i - 1][_j - 1] + 1, Math.min(matrix[_i][_j - 1] + 1, matrix[_i - 1][_j] + 1));
					}
				}
			}
			return matrix[otherString.length][string.length];
		}
	}]);

	return Text;
}();

exports.default = Text;