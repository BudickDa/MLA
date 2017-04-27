require('babel-core/register');
require('babel-regenerator-runtime')
require('babel-polyfill');
const Classifier = {};
Classifier.Test = require('./dist/test').default;
Classifier.Utils = require('./dist/utils').default;
Classifier.NearestNeighbour = require('./dist/nearest-neighbour').default;
Classifier.Vector = require('./dist/vector').default;
Classifier.Text = require('./dist/text').default;
Classifier.DocumentClustering = require('./dist/document-clustering').default;

module.exports = Classifier;
