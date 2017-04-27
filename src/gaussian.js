import Classifier from "./classifier";

export default class Gaussian extends Classifier{
	constructor(vectors = [], labels= []){
		super(vectors, labels);
	}
	classify(vector) {
		if (this.labels.length === 0 || this.vectors.length === 0) {
			throw new Error("Please train your classifier first.");
		}
		if (vector.length() !== this.vectors[0].length()) {
			throw new Error("Vector has to has the same dimension as trainings data.");
		}

		let bestDistance = Infinity;
		let bestIndex = -1;
		this.vectors.forEach((referenceVector, index) => {
			let distance = vector.euclideanDistance(referenceVector);
			if(distance<bestDistance){
				bestDistance = distance;
				bestIndex = index;
			}
		});
		return this.labels[bestIndex];
	}
}