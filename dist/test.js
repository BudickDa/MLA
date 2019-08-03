'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

var _documentClustering = require('./clusterer/document-clustering');

var _documentClustering2 = _interopRequireDefault(_documentClustering);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var Test = function () {
	function Test() {
		_classCallCheck(this, Test);
	}

	_createClass(Test, null, [{
		key: 'findCategory',
		value: function findCategory(document, documents) {
			for (var category in documents) {
				if (typeof document === 'string') {
					if (_lodash2.default.includes(documents[category], document)) {
						return category;
					}
				}

				if (document instanceof _vector2.default) {
					for (var i in documents[category]) {
						if (document.equal(documents[category][i])) {
							return category;
						}
					}
				}
			}
		}
	}, {
		key: 'categories',
		value: function categories(documents) {
			var categories = [];
			for (var category in documents) {
				categories.push(category);
			}
			return categories;
		}
	}, {
		key: 'constructCorpus',
		value: function constructCorpus(documents) {
			var corpus = [];
			for (var category in documents) {
				corpus = corpus.concat(documents[category]);
			}
			return corpus;
		}
	}, {
		key: 'splitDocuments',
		value: function splitDocuments(documents) {
			var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;

			var training = {};
			var test = {};
			for (var category in documents) {
				training[category] = chance.pickset(documents[category], documents[category].length * ratio);
				test[category] = _lodash2.default.difference(documents[category], training[category]);
			}
			return {
				training: training,
				test: test
			};
		}

		/**
   * Calculates error by comparing clusters to test data
   * @param clusters {[[]]}
   * @param test {{category: []}
   * @returns {number}
   */

	}, {
		key: 'testClusterer',
		value: function testClusterer(em, test) {
			var corrects = 0;
			var wrongs = 0;

			var _loop = function _loop(category) {
				var vectors = test[category];
				vectors.forEach(function (vector) {
					console.log('Test');
					console.log(_documentClustering2.default.classify(vector, em.classes));
					console.log(category);
				});
			};

			for (var category in test) {
				_loop(category);
			}
			return wrongs / (corrects + wrongs) * 100;
		}
	}]);

	return Test;
}();

exports.default = Test;