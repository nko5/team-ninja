'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (VeronicaService, GameApi, $interval) {
        VeronicaService.say("Lone ranger, Buttered scone, Top of the house number 1, Son of a gun, At the beginning");

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
