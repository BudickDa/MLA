import numeric from 'numeric';
import Chance from 'chance'
import Class from '../class';

import Algorythm from './abstract_algorythm';

export default class EM extends Algorythm {
	constructor() {
		super()
	}

	async cluster(matrixOrVectors, k = 2, maxIterations = 1000) {
		const epsilon = Number.EPSILON
		const matrix = this.validate('EM.cluster', matrixOrVectors);
		const vectors = matrix.toVectors();

		const points = vectors.map(v => v.values);
		const constants = {
			k: k,
			epsilon: epsilon,
			dim: points[0].length
		};
		const data = {
			matrix: matrix.transpose(),
			points: points,
			transposed_points: numeric.transpose(points),
			iteration: numeric.random([k, points.length])
		};
		this.classes = this._recursion(data, constants, maxIterations);
		const clusters = [];
		this.classes.forEach(center => {
			clusters.push([]);
		});
		vectors.forEach(vector => {
			let maxProbability = -1;
			let bestIndex = -1;
			this.classes.forEach((c, index) => {
				const probability = c.getProbability(vector);
				if (maxProbability < probability) {
					maxProbability = probability;
					bestIndex = index;
				}
			});
			clusters[bestIndex].push(vector);
		});
		return clusters;
	}

	_recursion(data, constants, maxIterations) {
		const groups = this._compute_groups(data.iteration, data.points, data.transposed_points, constants.dim);
		const oldts = data.iteration;
		data.iteration = this._tiks(groups, data.points, constants.k, constants.dim);
		const delta = numeric.norminf(numeric.sub(data.iteration, oldts));
		if (delta <= constants.epsilon || maxIterations === 0) {
			return groups;
		}
		return this._recursion(data, constants, maxIterations - 1);
	}

	_compute_groups(tiks, points, transposed_points, dim) {
		const len = tiks.length;
		const res = new Array(len);
		const sum = numeric.sum(tiks);
		for (let g = 0; g < len; g++){
			let tik = tiks[g];
			let tiksum = numeric.sum(tik);

			if (tiksum < numeric.epsilon) {
				tik = numeric.rep([tik.length], numeric.epsilon);
				tiksum = tik.length * numeric.epsilon;
			}
			// Compute the weight
			const weight = tiksum / sum;
			// Compute the mean
			const mu = numeric.div(transposed_points, tiksum);

			for (let m = 0; m < mu.length; m++) mu[m] = numeric.sum(numeric.muleq(mu[m], tik));
			// Compute the covariance
			const sigma = numeric.diag(numeric.rep([dim], numeric.epsilon));
			for (let i = 0; i < points.length; i++){
				const point = points[i];
				const diff = numeric.sub(point, mu);
				const coeff = tik[i] / tiksum;
				const diffdiff = numeric.rep([dim, dim], 0);
				for (let a = 0; a < diff.length; a++){
					for (let b = 0; b <= a; b++){
						const tmp = coeff * diff[a] * diff[b];
						sigma[a][b] += tmp;
						if (b !== a) sigma[b][a] += tmp;
					}
				}
			}
			res[g] = new Class(weight, mu, sigma);
		}
		return res;
	}

	// == Estimation phase ==
	_tiks(groups, points, k, dim) {
		var res = new Array(points.length);

		for (var p = 0; p < points.length; p++){
			var point = points[p];
			var line = new Array(k);
			var sum = 0;
			// Compute the raw density values
			for (var g = 0; g < k; g++){
				var group = groups[g];
				var proba = group.getProbability(point);
				line[g] = proba;
				sum += proba;
			}
			// Convert to probabilities by dividing by the sum
			if (sum > 0) for (var g = 0; g < k; g++) line[g] /= sum;
			else for (var g = 0; g < k; g++) line[g] = 1 / k;
			res[p] = line;
		}

		return numeric.transpose(res);
	}
}