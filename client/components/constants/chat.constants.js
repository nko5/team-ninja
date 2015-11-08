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
            CLAIM_RESULT: "CLAIM_RESULT"
        }
    });