'use strict';

angular.module('teamNinjaApp')
    .constant("AppConstants", {
        Events: {
            CHAT: "CHAT",
            CLAIM: "CLAIM",
            JOIN: "JOIN",
            LEAVE: "LEAVE",
            ACKNOWLEDGE: "ACKNOWLEDGE",
            START: "START",
            REWARD: "REWARD"
        }
    });