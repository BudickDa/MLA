import Utils from './utils';
import Vector from './vector';
const Gaussian = require('multivariate-gaussian');

export default class Class {
	constructor(weight, meanVector, sigma) {
		this.weight = weight;
		this.meanVector = meanVector;
		this.sigma = sigma;
		this._gaussian = new Gaussian({sigma, mu: meanVector});
	}

	getProbability(vector) {
		if (vector instanceof Vector) {
			vector = vector.values
		}
		return this.weight * this._gaussian.density(vector);
		//return this.weight * Utils.multivariantGaussian(vector, this.meanVector, this.sigma);
	}
}