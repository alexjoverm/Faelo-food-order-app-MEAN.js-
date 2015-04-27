'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'faelo-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'manager', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '898683760175075',
    clientSecret: process.env.FACEBOOK_SECRET || '05ad68f92dd880f6cd869fceec59ea53',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'yZ8qpWGeUFZTub6neWY9lmjn8',
    clientSecret: process.env.TWITTER_SECRET || 'cFY1xCHR4hU4UGMJTjaYqzQEFz3KsX2K7DplQ7uAeMWJZX9L7Q',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || '446111349533-bi8f5flf9jbrdbnu6iersp99b88ts1u3.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'DR2FyLiW6BTtKOwR_u1RKtG4',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
