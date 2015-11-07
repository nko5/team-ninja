'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval) {
        var self = this;
        self.number;
        GameApi.list(function(data){
            self.game = data.games[0];
            startCalling();
        });

        var promise;

        var startCalling = function () {
            if (!promise) {
                promise = $interval(callNumber, 7000);
            }
        };

        var clearInterval = function () {
            $interval.cancel(promise);
        };

        var callNumber = function () {
            GameApi.callNumber({id: self.game._id}, function(number){
                self.number = number;
                Veronica.say(number.description, [{
                    delay: 1000,
                    message: number.inWords
                }]);
            });
        }
    });
