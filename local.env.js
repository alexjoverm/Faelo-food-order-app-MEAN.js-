'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "faelo-secret",

  FACEBOOK_ID: '898683760175075',
  FACEBOOK_SECRET: '05ad68f92dd880f6cd869fceec59ea53',

  TWITTER_ID: 'yZ8qpWGeUFZTub6neWY9lmjn8',
  TWITTER_SECRET: 'cFY1xCHR4hU4UGMJTjaYqzQEFz3KsX2K7DplQ7uAeMWJZX9L7Q',

  GOOGLE_ID: '446111349533-bi8f5flf9jbrdbnu6iersp99b88ts1u3.apps.googleusercontent.com',
  GOOGLE_SECRET: 'DR2FyLiW6BTtKOwR_u1RKtG4',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
