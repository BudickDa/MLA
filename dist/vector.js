"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    }, {
        key: "euclideanDistance",
        value: function euclideanDistance(vector) {
            if (!(vector instanceof Vector)) {
                throw new TypeError("Parameter has to be a vector.");
            }
            if (this.values.length !== vector.length()) {
                throw new TypeError("Can only calculate distance between vectors with the same dimensions.");
            }
            var sum = 0;
            this.values.forEach(function (value, index) {
                sum += Math.pow(value - vector.getValue(index), 2);
            });
            return Math.sqrt(sum);
        }
    }, {
        key: "length",
        value: function length() {
            return this.values.length;
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