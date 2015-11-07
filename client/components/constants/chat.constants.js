'use strict';

angular.module('teamNinjaApp')
    .constant("AppConstants", {
        Events: {
            CHAT: "CHAT",
            CLAIM: "CLAIM",
            JOIN: "JOIN",
            LEAVE: "LEAVE"
        }
    });