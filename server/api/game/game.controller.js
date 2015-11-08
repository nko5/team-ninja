'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var async = require("async");
var Number = require('../number/number.model');
var Rule = require('../rule/rule.model');

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
            console.log(req.params.id, game);
            return res.status(404).send('Not Found');
        }
        var number = 99;
        var numbers = game.calledNumbers;
        if (numbers.length != 90) {

            while (number > 90 || number < 1) {
                number = Math.floor(Math.random() * 100);
                if (numbers.indexOf(number) < 0 && number <= 90) {
                    numbers.push(number);
                }
            }

        } else {
            number = -1;
        }
        game.save(function (err, game) {
            if (err) {
                return handleError(res, err);
            }
            Number.findOne({
                number: number
            }, function (err, numberObj) {
                if (err) {
                    return handleError(res, err);
                }
                if (!numberObj) {
                    console.log(numberObj, number);
                    return res.status(404).send('Not Found');
                }
                return res.json({
                    number: numberObj.number,
                    description: numberObj.description,
                    inWords: numberObj.inWords("en").replace("-", "")
                });
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
    var user = {
        id: req.user._id,
        name: req.user.name,
        picture: req.user.picture
    };
    Rule.find({}, function (err, rules) {
        if (err) {
            return handleError(res, err);
        }

        exports.generateBoard(function (tickets) {
            var game = new Game({
                host: user,
                player: [user],
                tickets: tickets,
                rules: rules.map(function (item) {
                    return {
                        id: item._id,
                        name: item.name
                    }
                })
            });
            game.save(function (err, game) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(201).json(game);
            });
        });
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

// Add player to a game
exports.addPlayer = function (req, res) {
    var player = {
        id: req.body._id,
        name: req.body.name,
        picture: req.body.picture
    };
    if (req.body.gameId) {
        Game.findById(req.body.gameId, function (err, game) {
            if (err) {
                return handleError(res, err);
            }
            else {
                Game.update(
                    {_id: req.body.gameId},
                    {$addToSet: {players: player}}, function (err, game) {
                        if (err) {
                            return res.json({
                                updated: false
                            });
                        }
                        else {
                            return res.json({
                                updated: true
                            });
                        }
                    });
            }
        });
    }
};

exports.generateBoard = function (callback) {
    var board = [],
        tasks = [],
        blanks = [],
        rowsPerTicket = 3,
        batchCount = 6,
        columnsPerTicket = 9,
        blankSpacesPerRow = 4,
        minValue = 1,
        maxValue = 89,
        num, column, modulus;

    tasks.push(function (oCB) {
        var k = 0;
        async.whilst(
            function () { return k < (batchCount * rowsPerTicket); },
            function (cb) { blanks[k] = 0; k++; cb(); },
            function () {
                oCB();
            }
        )
    });

    tasks.push(function (oCB) {
        var v = {i: 1};
        async.whilst(
            function() { return v.i < maxValue; },
            function(cb) {
                findRow(v, board, batchCount, rowsPerTicket, blanks, function() {
                    v.i++;
                    cb();
                }, 0);
            },
            function() {
                oCB(null, board);
            }
        );
    });

    async.series(tasks, function (err, resp) {
        if(err) {
            console.log("Error generating board", err);
            return callback([]);
        }
        var board = resp[1],
            x = 0,
            tickets = [],
            counter = 0;

        async.whilst(
            function() { return x < 6; },
            function(cb) {
                tickets.push({
                    tickets: board.slice(counter, counter + 3),
                    status: "UNUSED"
                });
                x++;
                counter += 3;
                cb();
            },
            function() {
                return callback(tickets);
            }
        );
    });
};

function findRow(v, board, batchCount, rowsPerTicket, blanks, cb, iter) {
    var modulus = Math.floor(Math.random() * (batchCount * rowsPerTicket));
    var column = Math.floor(v.i / 10);

    if(!(board[modulus] && board[modulus].length)) {
        board[modulus] = [];
        board[modulus].length = (batchCount * rowsPerTicket);
    }

    if(typeof board[modulus][column] !== "undefined") {
        setImmediate(function () {
            if(iter >= 500) {
                console.log(v.i);
                v.i++;
            }
            return findRow(v, board, batchCount, rowsPerTicket, blanks, cb, ++iter);
        });
    } else if(blanks[modulus] > 4) {
        setImmediate(function () {
            if(iter >= 500) {
                console.log(v.i);
                v.i++;
            }
            return findRow(v, board, batchCount, rowsPerTicket, blanks, cb, ++iter);
        });
    } else {
        board[modulus][column] = v.i;
        blanks[modulus]++;
        return cb();
    }
}
