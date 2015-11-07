'use strict';

var _ = require('lodash');
var Number = require('./number.model');

// Get list of numbers
exports.index = function(req, res) {
  Number.find(function (err, numbers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(numbers);
  });
};

// Get a single number
exports.show = function(req, res) {
  Number.findById(req.params.id, function (err, number) {
    if(err) { return handleError(res, err); }
    if(!number) { return res.status(404).send('Not Found'); }
    return res.json(number);
  });
};

// Creates a new number in the DB.
exports.create = function(req, res) {
  Number.create(req.body, function(err, number) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(number);
  });
};

// Updates an existing number in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Number.findById(req.params.id, function (err, number) {
    if (err) { return handleError(res, err); }
    if(!number) { return res.status(404).send('Not Found'); }
    var updated = _.merge(number, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(number);
    });
  });
};

// Deletes a number from the DB.
exports.destroy = function(req, res) {
  Number.findById(req.params.id, function (err, number) {
    if(err) { return handleError(res, err); }
    if(!number) { return res.status(404).send('Not Found'); }
    number.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}