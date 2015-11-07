'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var Number = require('../number/number.model');

// Get list of games
exports.index = function (req, res) {
    Game.find(function (err, games) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json({games: games});
    });
};

// Get a single game
exports.callNumber = function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.status(404).send('Not Found');
        }
        var number;
        var numbers = game.calledNumbers;
        if (numbers.length != 90) {
            number = Math.floor(Math.random() * 100);
            if (numbers.indexOf(number) < 0 && number <= 90) {
                numbers.push(number);
            }
        }
        game.save(function (err, game) {
            Number.findOne({
                number: number
            }, function (err, number) {
                if (err) {
                    return handleError(res, err);
                }
                if (!number) {
                    return res.status(404).send('Not Found');
                }
                return res.json(number);
            });

        });
    });
};

// Get a single game
exports.show = function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.status(404).send('Not Found');
        }
        return res.json(game);
    });
};

// Creates a new game in the DB.
exports.create = function (req, res) {
    Game.create(req.body, function (err, game) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(game);
    });
};

// Updates an existing game in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(game, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(game);
        });
    });
};

// Deletes a game from the DB.
exports.destroy = function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.status(404).send('Not Found');
        }
        game.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}