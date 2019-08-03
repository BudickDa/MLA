import Utils from '../utils';
import Matrix from '../matrix';
import Class from '../class';
import Algorythm from './abstract_algorythm';
export default class KNearestNeighbours extends Algorythm {
	async cluster(vectors, k = 6, iterations = 10) {
		const centers = Utils.kMostDistant(vectors, k);
		const clusters = [];
		centers.forEach(center => {
			clusters.push([]);
		});
		vectors.forEach(vector => {
			let minDistance = Infinity;
			let bestIndex = -1;
			centers.forEach((center, index) => {
				const distance = vector.euclideanDistance(center);
				if (minDistance > distance) {
					minDistance = distance;
					bestIndex = index;
				}
			});
			clusters[bestIndex].push(vector.label);
		});

		const weights = Utils.getWeights(clusters);
		this.classes = clusters.map((cluster, index) => {
			return new Class(weights[index], Utils.meanVector(cluster), Utils.getSigma(new Matrix(cluster)));
		});
		return clusters;
	}
}
