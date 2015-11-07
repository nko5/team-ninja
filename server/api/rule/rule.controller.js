'use strict';

var _ = require('lodash');
var Rule = require('./rule.model');

// Get list of rules
exports.index = function(req, res) {
  Rule.find(function (err, rules) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(rules);
  });
};

// Get a single rule
exports.show = function(req, res) {
  Rule.findById(req.params.id, function (err, rule) {
    if(err) { return handleError(res, err); }
    if(!rule) { return res.status(404).send('Not Found'); }
    return res.json(rule);
  });
};

// Creates a new rule in the DB.
exports.create = function(req, res) {
  Rule.create(req.body, function(err, rule) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(rule);
  });
};

// Updates an existing rule in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Rule.findById(req.params.id, function (err, rule) {
    if (err) { return handleError(res, err); }
    if(!rule) { return res.status(404).send('Not Found'); }
    var updated = _.merge(rule, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(rule);
    });
  });
};

// Deletes a rule from the DB.
exports.destroy = function(req, res) {
  Rule.findById(req.params.id, function (err, rule) {
    if(err) { return handleError(res, err); }
    if(!rule) { return res.status(404).send('Not Found'); }
    rule.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}