require('babel-core/register');
require('babel-regenerator-runtime')
require('babel-polyfill');
const Classifier = {};
Classifier.Test = require('./dist/test').default;
Classifier.Utils = require('./dist/utils').default;
Classifier.NearestNeighbour = require('./dist/nearest-neighbour').default;
Classifier.Vector = require('./dist/vector').default;
Classifier.Matrix = require('./dist/matrix').default;
Classifier.Text = require('./dist/text').default;
Classifier.Algorythm = require('./dist/algorythm').default;
Classifier.DocumentClustering = require('./dist/clusterer/document-clustering').default;

module.exports = Classifier;
