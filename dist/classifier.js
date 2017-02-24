"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classifier = function () {
    function Classifier(vectors, labels) {
        _classCallCheck(this, Classifier);

        this.train(vectors, labels);
    }

    _createClass(Classifier, [{
        key: "train",
        value: function train(vectors, labels) {
            if (!Array.isArray(vectors) || !Array.isArray(labels)) {
                throw new TypeError("Both parameters of train have to be arrays.");
            }
            if (vectors.length !== labels.length) {
                throw new TypeError("Vectors and Labels must have the same length.");
            }
            this.vectors = vectors;
            this.labels = labels;
        }
    }]);

    return Classifier;
}();

exports.default = Classifier;