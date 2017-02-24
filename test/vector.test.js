const assert = require('assert');
const {Vector} = require("../index");

describe('Vector', function () {
    describe('#euclideanDistance', function () {
        it('be zero on same vectors', function () {
            const v1 = new Vector(5);
            const v2 = new Vector(5);
            assert(v1.euclideanDistance(v2) === 0);
        });
        it('be zero on same vectors', function () {
            const v1 = new Vector([1, 2, 3]);
            const v2 = new Vector([1, 2, 3]);
            assert(v1.euclideanDistance(v2) === 0);
        });
        it('distance between vectors', function () {
            const v1 = new Vector([1, 2, 3]);
            const v2 = new Vector([3, 2, 1]);
            assert(v1.euclideanDistance(v2) > 0);
        });
        it('distance between vectors', function () {
            const v1 = new Vector([3, 2, 3]);
            const v2 = new Vector([3, 2, 1]);
            assert(v1.euclideanDistance(v2) === 2);
        });
    });
});
