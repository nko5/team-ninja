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
            console.log(req.params.id, game);
            return res.status(404).send('Not Found');
        }
        var number = 99;
        var numbers = game.calledNumbers;
        if (numbers.length != 90) {

            while (number > 90 || number < 1){
                number = Math.floor(Math.random() * 100);
                if (numbers.indexOf(number) < 0 && number <= 90) {
                    numbers.push(number);
                }
            }

        }else{
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
    req.body.dateCreated = +new Date();

  new Game(req.body).save(function (err, game) {
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

// Add player to a game
exports.addPlayer = function (req, res) {
  var player = {
    id : req.body._id,
    name : req.body.name,
    picture : req.body.picture
  };
  if (req.body.gameId) {
    Game.findById(req.body.gameId, function (err, game) {
      if (err) {
        return handleError(res, err);
      }
      else{
        Game.update(
          { _id: req.body.gameId },
          { $addToSet: {players: player } }, function(err,game){
            if(err){
              return res.json({
                updated : false
              });
            }
            else{
              return res.json({
                updated : true
              });
            }
          });
      }
    });
  }
};
