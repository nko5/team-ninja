'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'teamninja-secret',

  FACEBOOK_ID:      '117282868634571',
  FACEBOOK_SECRET:  '18418c02c290ee371411713a8e34c488',

  TWITTER_ID:       'GGOEToq5ih3VQDDojrqXw1OWU',
  TWITTER_SECRET:   'SYwOAUzij8mRJV2ggwSMvaSRaRl4d4MZnHtMF2dYcHIky3uHSF',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
