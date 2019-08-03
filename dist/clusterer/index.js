'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _documentClustering = require('./document-clustering');

var _documentClustering2 = _interopRequireDefault(_documentClustering);

var _kNearestNeighbour = require('./k-nearest-neighbour');

var _kNearestNeighbour2 = _interopRequireDefault(_kNearestNeighbour);

var _kMeans = require('./k-means');

var _kMeans2 = _interopRequireDefault(_kMeans);

var _expectationMaximazation = require('./expectation-maximazation');

var _expectationMaximazation2 = _interopRequireDefault(_expectationMaximazation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Clusterer = {
	_DocumentClustering: _documentClustering2.default,
	KNearestNeighbour: _kNearestNeighbour2.default,
	KMeans: _kMeans2.default,
	EM: _expectationMaximazation2.default
};
exports.default = Clusterer;