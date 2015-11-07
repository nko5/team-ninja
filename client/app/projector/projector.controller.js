'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (VeronicaService, NumberApi, $interval) {
        VeronicaService.say("It's good to be alive, Oye kiddan!");

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
            NumberApi.get({}, function () {

            }, function () {

            });
        }
    });
