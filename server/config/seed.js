'use strict';

var Number = require('../api/number/number.model'),
    User = require('../api/user/user.model'),
    Game = require('../api/game/game.model'),
    Rule = require('../api/rule/rule.model');

var getUserObj = function (user) {
    return {
        'id': user._id,
        'name': user.name,
        'picture': user.picture
    };
};

var createGame = function (users, rules) {
    Game.create({
        host: users.host,
        players: users.players,
        rules: rules
    }, function (err) {
        if (err) {
            throw err;
        }
        console.log("Created game");
    });
};

var createRules = function (cb) {
    Rule.create({
        name: "Full House 1",
        description: "To win this title walk 600 KMs on your knees."
    }, {
        name: "Full House 2",
        description: "To win this title walk 600 KMs on your knees."
    }, {
        name: "Full House 3",
        description: "To win this title walk 600 KMs on your knees."
    }, {
        name: "Full House 4",
        description: "To win this title walk 600 KMs on your knees."
    }, {
        name: "Top Lane",
        description: "To win this title walk 600 KMs on your knees."
    }, {
        name: "Middle Lane",
        description: "To win this title walk 600 KMs on your knees."
    }, {
        name: "Bottom Lane",
        description: "To win this title walk 600 KMs on your knees."
    }, function (err) {
        console.log("Created rules");
        var rules = [
            arguments[1],
            arguments[2],
            arguments[3],
            arguments[4],
            arguments[5],
            arguments[6],
            arguments[7]
        ];
        console.log(rules);
        cb(err, rules);
    });
};

var createUsers = function (cb) {
    User.create({
        name: "Nikhil Bhandari",
        email: "nikhil.bhandari.74@gmail.com",
        password: "supersecure",
        role: "admin"
    }, {
        name: "Manoj Nama",
        email: "manoj.nama@outlook.com",
        password: "supersecure",
        role: "admin"
    }, {
        name: "Sakshi Tyagi",
        email: "sakhi.tyagi@gmail.com",
        password: "supersecure",
        role: "admin"
    }, function (err, nikhil, manoj, sakshi) {
        if (err) {
            throw err;
        }
        console.log("User created");
        cb({
            players: [getUserObj(nikhil),getUserObj(manoj), getUserObj(sakshi)],
            host: getUserObj(nikhil)
        })
    });
};

var createNumbers = function () {
    Number.create({
        "number": 1,
        "description": "Lone ranger, Buttered scone, Top of the house number 1, Son of a gun, At the beginning"
    }, {
        "number": 2,
        "description": "One little duck, Me and you, Kaala dhan"
    }, {
        "number": 3,
        "description": "Happy family, goodness me"
    }, {
        "number": 4,
        "description": "Murgi chor, Knock at the door"
    }, {
        "number": 5,
        "description": "Punjab da puttar, Symbol of congress"
    }, {
        "number": 6,
        "description": "Bottom heavy, Chopping sticks, Super sixer, In a fix"
    }, {
        "number": 7,
        "description": "Lucky no. Seven, One hockey stick, God's in Heaven, Jackpot no. 7, Colours of rainbow, saat sur, saa"
    }, {
        "number": 8,
        "description": "One fat major, Garden gate, Big fat lady number 8"
    }, {
        "number": 9,
        "description": "Doctor's time, Number of planets in solar system number 9"
    }, {
        "number": 10,
        "description": "A big fat hen, Cock and hen, Uncle Ben"
    }, {
        "number": 11,
        "description": "Two heavenly legs, Two beautiful legs 1 and 1 eleven"
    }, {
        "number": 12,
        "description": "One dozen"
    }, {
        "number": 13,
        "description": "Bakers dozen, Unlucky for some lucky for me no. thirteen"
    }, {
        "number": 14,
        "description": "Valentine's Day, Tender chick"
    }, {
        "number": 15,
        "description": "Yet to be kissed"
    }, {
        "number": 16,
        "description": "Sweet sixteen, never been kissed"
    }, {
        "number": 17,
        "description": "Dancing Queen"
    }, {
        "number": 18,
        "description": "Voting age"
    }, {
        "number": 19,
        "description": "Last of the teens, End of the teens 1 and 9 nineteen"
    }, {
        "number": 20,
        "description": "One score, Blind 20"
    }, {
        "number": 21,
        "description": "President's salute"
    }, {
        "number": 22,
        "description": "Two little ducks"
    }, {
        "number": 23,
        "description": "You and me"
    }, {
        "number": 24,
        "description": "Two dozen"
    }, {
        "number": 25,
        "description": "Quarter, Silver Jublee Number"
    }, {
        "number": 26,
        "description": "Republic Day"
    }, {
        "number": 27,
        "description": "Gateway to heaven"
    }, {
        "number": 28,
        "description": "Duck and its mate"
    }, {
        "number": 29,
        "description": "In your prime"
    }, {
        "number": 30,
        "description": "Women get flirty at 30"
    }, {
        "number": 31,
        "description": "Time for fun"
    }, {
        "number": 32,
        "description": "Mouth Full"
    }, {
        "number": 33,
        "description": "All the 3s"
    }, {
        "number": 34,
        "description": "Dil mange more"
    }, {
        "number": 35,
        "description": "Flirty wife"
    }, {
        "number": 36,
        "description": "Popular size"
    }, {
        "number": 37,
        "description": "Mixed luck"
    }, {
        "number": 38,
        "description": "Oversize"
    }, {
        "number": 39,
        "description": "Watch your waistline"
    }, {
        "number": 40,
        "description": "Naughty 40"
    }, {
        "number": 41,
        "description": "Life's begun at 41"
    }, {
        "number": 42,
        "description": "Quit India Movement"
    }, {
        "number": 43,
        "description": "Pain in the knee"
    }, {
        "number": 44,
        "description": "All the fours"
    }, {
        "number": 45,
        "description": "Halfway there"
    }, {
        "number": 46,
        "description": "Up to tricks"
    }, {
        "number": 47,
        "description": "Year of Independence"
    }, {
        "number": 48,
        "description": "Four dozen"
    }, {
        "number": 49,
        "description": "Rise and shine"
    }, {
        "number": 50,
        "description": "Half a century, Golden Jublee"
    }, {
        "number": 51,
        "description": "Charity begins at 51"
    }, {
        "number": 52,
        "description": "Pack of cards"
    }, {
        "number": 53,
        "description": "Pack with a joker"
    }, {
        "number": 54,
        "description": "Pack with two jokers"
    }, {
        "number": 55,
        "description": "All the fives"
    }, {
        "number": 56,
        "description": "Pick up sticks"
    }, {
        "number": 57,
        "description": "Mutiny Year"
    }, {
        "number": 58,
        "description": "Time to retire"
    }, {
        "number": 59,
        "description": "Just retired"
    }, {
        "number": 60,
        "description": "Five dozen"
    }, {
        "number": 61,
        "description": "Bakers bun"
    }, {
        "number": 62,
        "description": "Click the two"
    }, {
        "number": 63,
        "description": "Click the three"
    }, {
        "number": 64,
        "description": "Catch the chor"
    }, {
        "number": 65,
        "description": "Old age pension"
    }, {
        "number": 66,
        "description": "Chakke pe chakka"
    }, {
        "number": 67,
        "description": "Made in heaven"
    }, {
        "number": 68,
        "description": "Saving grace"
    }, {
        "number": 69,
        "description": "Ulta Pulta"
    }, {
        "number": 70,
        "description": "Lucky blind"
    }, {
        "number": 71,
        "description": "Lucky bachelor"
    }, {
        "number": 72,
        "description": "Lucky couple"
    }, {
        "number": 73,
        "description": "A crutch and a flea"
    }, {
        "number": 74,
        "description": "Lucky chor"
    }, {
        "number": 75,
        "description": "Lucky Five, Diamond Jublee"
    }, {
        "number": 76,
        "description": "Lucky six"
    }, {
        "number": 77,
        "description": "Two hockey sticks"
    }, {
        "number": 78,
        "description": "Heaven's gate"
    }, {
        "number": 79,
        "description": "One more time, lucky nine"
    }, {
        "number": 80,
        "description": "Gandhi's breakfast"
    }, {
        "number": 81,
        "description": "Corner shot"
    }, {
        "number": 82,
        "description": "Last of the two, Fat lady with a duck"
    }, {
        "number": 83,
        "description": "India wins Cricket World Cup"
    }, {
        "number": 84,
        "description": "Last of the chors"
    }, {
        "number": 85,
        "description": "Grandma"
    }, {
        "number": 86,
        "description": "Last six"
    }, {
        "number": 87,
        "description": "Grandpa"
    }, {
        "number": 88,
        "description": "Two fat ladies"
    }, {
        "number": 89,
        "description": "All but one"
    }, {
        "number": 90,
        "description": "Top of the house"
    }, function (err) {
        if (err) {
            throw err;
        }
        console.log("Number Created");
    });
};


var startSeed = function () {
    createNumbers();
    createUsers(function (users) {
        createRules(function (err, rules) {
            createGame(users, rules)
        });

    });
};

(function clearAll() {
    var domains = [Number, User, Game, Rule];
    domains.forEach(function (domain, index) {
        (function (i) {
            domain.find({}).remove(function onDelete(err) {
                if (err) {
                    throw err;
                }

                console.log("Deleted all contents");
                if (index == domains.length - 1) {
                    console.log("Starting seed");
                    startSeed();
                }

            });
        })(index);
    });
})();