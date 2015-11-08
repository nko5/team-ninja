'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('teamNinjaApp')
    .directive('timer', function ($interval) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs) {
                var time = 1000;
                scope.formattedTime = moment.utc(time).format("HH:mm:ss");
                $interval(function () {
                    time += 1000;
                    scope.formattedTime = moment.utc(time).format("HH:mm:ss");
                }, 1000);
            },
            template: "<span style='display: inline-block;'>{{formattedTime}}</span>"
        };
    });