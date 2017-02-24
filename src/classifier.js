export default class Classifier{
    constructor(vectors, labels) {
        this.train(vectors, labels);
    }

    train(vectors, labels) {
        if (!Array.isArray(vectors) || !Array.isArray(labels)) {
            throw new TypeError("Both parameters of train have to be arrays.");
        }
        if (vectors.length !== labels.length) {
            throw new TypeError("Vectors and Labels must have the same length.");
        }
        this.vectors = vectors;
        this.labels = labels;
    }

}