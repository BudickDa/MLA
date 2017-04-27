export default class Vector {
    constructor(valuesOrDimension, label) {
        if (Array.isArray(valuesOrDimension)) {
            this.values = valuesOrDimension;
        } else if (typeof valuesOrDimension === "number") {
            this.values = Array.apply(null, Array(valuesOrDimension)).map(Number.prototype.valueOf, 0);
        } else {
            throw TypeError("Parameter of vector constructor has to be an array or a number");
        }
        if(typeof label === 'string'){
            this.label = label;
        }
    }

    getValue(index) {
        if (typeof index !== "number") {
            throw TypeError("Index has to be a number.");
        }
        if (index >= this.values.length) {
            throw RangeError(`Index out of bounds: ${index}, max: ${this.values.length - 1}`);
        }
        return this.values[index];
    }

    euclideanDistance(vector) {
        if (!(vector instanceof Vector)) {
            throw new TypeError("Parameter has to be a vector.");
        }
        if (this.values.length !== vector.length()) {
            throw new TypeError("Can only calculate distance between vectors with the same dimensions.");
        }
        let sum = 0;
        this.values.forEach((value, index) => {
            sum += Math.pow(value - vector.getValue(index), 2);
        });
        return Math.sqrt(sum);
    }

    length() {
        return this.values.length;
    }

    fill(value) {
        this.values.fill(value);
    }
}
