'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function () {
	function Test() {
		_classCallCheck(this, Test);
	}

	_createClass(Test, null, [{
		key: 'findCategory',
		value: function findCategory(document, documents) {
			for (var category in documents) {
				if (_underscore2.default.contains(documents[category], document)) {
					return category;
				}
			}
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
	}]);

	return Test;
}();

exports.default = Test;