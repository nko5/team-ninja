'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (VeronicaService, GameApi, $interval, $scope, AppConstants, SocketIO) {
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
        };

        $scope.$on("socket:" + AppConstants.Events.CHAT, function (evt, data) {
            console.log(data);
        });
    });
