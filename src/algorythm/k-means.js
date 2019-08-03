import _ from 'lodash';
import Utils from '../utils';
import Class from '../class';
import Algorythm from './abstract_algorythm';
export default class KMeans extends Algorythm  {
	async cluster(vectors, k = 6, iterations = 10) {
		let centers = Utils.kMostDistant(vectors, k);
		let clusters = [];
		const allClusters = [];
		for (let j = 1; j < iterations; j++){
			for (let i = 0; i < 1000; i++){
				const lastCenters = _.cloneDeep(centers);
				const distanceChanges = [];
				if (lastCenters.length === k) {
					centers.forEach((c, i) => {
						distanceChanges.push(c.euclideanDistance(lastCenters[i]));
					});
				} else {
					centers = KMeans._findCenters(clusters);
				}

				centers.forEach(() => {
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
					clusters[bestIndex].push(vector);
				});
				if (Utils.sum(distanceChanges) === 0) {
					i = Infinity;
				}
			}
			allClusters.push({
				clusters: _.cloneDeep(clusters),
				quality: KMeans._qualityOfCenters(centers)
			});
			clusters = [];
		}

		clusters = KMeans._findBestCluster(allClusters);

		const weights = Utils.getWeights(clusters);
		this.classes = clusters.map((cluster, index) => {
			return new Class(weights[index], Utils.meanVector(cluster), Utils.getSigma(new Matrix(cluster)));
		});
		return clusters;
	}

	static _findCenters(clusters) {
		const centers = [];
		clusters.forEach((cluster, i) => {
			if (cluster.length > 0) {
				centers[i] = Utils.meanVector(cluster);
			}
		});
		return centers;
	}

	static _findBestCluster(allClusters) {
		return _.last(_.sortBy(allClusters, c => {
			return c.quality;
		})).clusters;
	}

	/**
	 * Product of distances between all centers.
	 * Higher is better.
	 * @returns {number}
	 */
	static _qualityOfCenters(centers) {
		let distance = 1;
		centers.forEach((center, index) => {
			centers.forEach((c, i) => {
				if (i !== index) {
					distance *= center.euclideanDistance(c);
				}
			});
		});
		return distance;
	}
}
