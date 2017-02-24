const assert = require('assert');
const {NearestNeighbour, Vector} = require("../index");

const a1 = new Vector([1, 2]);
const a2 = new Vector([2, 2]);
const a3 = new Vector([2, 1]);
const a4 = new Vector([3, 2]);

const b1 = new Vector([2, 4]);
const b2 = new Vector([0, 6]);
const b3 = new Vector([1, 5]);
const b4 = new Vector([1, 6]);

const c1 = new Vector([5, 0]);
const c2 = new Vector([6, 1]);
const c3 = new Vector([7, 2]);
const c4 = new Vector([5, 1]);

const vectors = [a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4];
const labels = ['a','a','a','a','b','b','b','b','c','c','c','c'];


describe('NearestNeigbour', function () {
    describe('#constructor', function () {
        it('length of trainingdata should be 12', function () {
            const n1 = new NearestNeighbour(vectors, labels);
            assert(n1.vectors.length === 12);
            assert(n1.labels.length === 12);
        });
    });
    describe('#train', function () {
        it('length of trainingdata should be 12', function () {
            const n2 = new NearestNeighbour();
            assert(n2.vectors.length === 0);
            assert(n2.labels.length === 0);
            n2.train(vectors, labels);
            assert(n2.vectors.length === 12);
            assert(n2.labels.length === 12);
        });
    });
    describe('#classify', function () {
        const nn = new NearestNeighbour(vectors, labels);
        it('should be a', function () {
            const a = new Vector([0,0]);
            assert(nn.classify(a)==='a');
        });
        it('should be b', function () {
            const b = new Vector([2,6]);
            assert(nn.classify(b)==='b');
        });
        it('should be c', function () {
            const c = new Vector([6,2]);
            assert(nn.classify(c)==='c');
        });
    });
});
