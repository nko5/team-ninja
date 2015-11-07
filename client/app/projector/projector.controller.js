'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (VeronicaService, GameApi, $interval) {
        VeronicaService.say("yipikaye ahem ahem!");

        var self = this;
        GameApi.list(function(data){
            self.game = data.games[0];

            GameApi.callNumber({id: self.game._id}, function(){

            })
        });



        var promise;

        var startCalling = function () {
            if (!promise) {
                promise = $interval(callNumber, 3000);
            }
        };

        var clearInterval = function () {
            $interval.cancel(promise);
        };

        var callNumber = function () {
            GameApi.get({}, function () {

            }, function () {

            });
        }
    });
