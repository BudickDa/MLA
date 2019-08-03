import Utils from '../utils';
import Matrix from '../matrix';

export default class Algorythm {
	validate(fncName, matrixOrVectors) {
		return Algorythm.validate(fncName, matrixOrVectors);
	}

	static validate(fncName, matrixOrVectors) {
		if (Utils.isVectorArray(matrixOrVectors)) {
			return new Matrix(matrixOrVectors);
		}
		if (matrixOrVectors instanceof Matrix) {
			return matrixOrVectors
		}
		throw new TypeError(`${fncName}: Parameter must be a matrix or an array of vectors.`);
	}
}