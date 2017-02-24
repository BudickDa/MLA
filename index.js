require('babel-core/register');
require('babel-regenerator-runtime')
require('babel-polyfill');
const Classifier = {};
Classifier.NearestNeighbour = require('./dist/nearest-neighbour').default;
Classifier.Vector = require('./dist/vector').default;

module.exports = Classifier;
