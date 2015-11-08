var _ = require('lodash');
var Game = require('./game.model');
var async = require("async");
var Number = require('../number/number.model');
var Rule = require('../rule/rule.model');
var Ticket = require('../ticket/ticket.model');


var findTicket = function (game, userId) {
    var userTicket;
    for (var i = 0; i < game.tickets.length; i++) {
        var ticket = game.tickets[i];
        if (ticket.userId && ticket.userId.toString() == userId.toString()) {
            userTicket = ticket;
            break;
        }
    }
    return ticket;
};
var findRule = function (game, identifier) {
    var rule;
    for (var i = 0; i < game.rules.length; i++) {
        var r = game.rules[i];
        if (r.identifier == identifier) {
            rule = r;
            break;
        }
    }
    return rule;
};

var checkFullHouse = function (ticket, game, selected) {
    var result = false;
    var flatTicket = _.flatten(ticket.board).filter(function (val) {
        return val != null;
    });
    var i1 = _.intersection(selected, flatTicket);
    var i2 = _.intersection(selected, game.calledNumbers);
    if (i1.length == i2.length && i1.length == flatTicket.length) {
        result = true;
    }
    return result;

};

var checkLane = function (lane, game, selected) {
    var flatTicket = _.flatten(lane).filter(function (val) {
        return val != null;
    });
    var i1 = _.intersection(selected, flatTicket);
    var i2 = _.intersection(selected, game.calledNumbers);
    return i1.length == i2.length && i1.length == flatTicket.length;
};

var checkRule = function (rule, user, game, selected) {
    var ticket = findTicket(game, user._id || user.id);
    var result = false;
    switch (rule.identifier) {
        case "FH1":
            result = checkFullHouse(ticket, game, selected);
            break;
        case "FH2":
            result = checkFullHouse(ticket, game, selected);
            break;
        case "FH3":
            result = checkFullHouse(ticket, game, selected);
            break;
        case "FH4":
            result = checkFullHouse(ticket, game, selected);
            break;
        case "TL":
            result = checkLane(ticket.board[0], game, selected);
            break;
        case "ML":
            result = checkLane(ticket.board[1], game, selected);
            break;
        case "BL":
            result = checkLane(ticket.board[2], game, selected);
            break;
        default :
            break;
    }
    if (result == false) {
        ticket.health--;
    } else {
        var r = findRule(game, rule.identifier)
        r.wonBy = user._id || user.id;
    }
    return result;
};

exports.claim = function (data, callback) {
    Game.findById(data.gameId, function (err, game) {
        if (err) {
            return callback(err);
        }
        if (!game) {
            return callback(err);
        }
        var result = checkRule(data.rule, data.user, game, data.selected);
        game.save();
        return callback({won: result, rule: data.rule});
    });
};