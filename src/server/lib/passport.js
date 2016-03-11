var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var knex = require('../db/knex');
var helpers = require('./helpers');


passport.use(new LocalStrategy({
},
  function(username, password, done) {
    knex('users').where('username', username)
      .then(function(data) {
        var user = data[0];
        if (password === user.password) {
          return done(null, user, {message: 'You\'re logged in!'});
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
    }).catch(function(err) {
      return done(null, false, {message: 'Incorrect username.'});
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/facebook/callback",
    profileFields: ['id', 'name', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    var id = profile.id;
    var firstName = profile.name.givenName;
    var lastName = profile.name.familyName;
    var email = profile.emails[0].value;
    knex('users').where('username', id)
      .then(function (user) {
        if (user[0] === undefined) {
          return knex('users').insert({username: id, email: email, first_name: firstName, last_name: lastName, admin: false})
          .then(function() {
            return knex('users').select('*').where('username', id)
            .then(function(user) {
              return user[0].id;
            });
          });
        }
        else {
          return user[0].id;
        }
      }).then(function (userID) {
        console.log(userID);
        return cb(null, userID);
      });
  }
));

// *** configure passport *** //
passport.serializeUser(function(userID, done) {
  done(null, userID);
});

passport.deserializeUser(function(id, done) {
  knex('users').where('id', id)
    .then(function(data) {
      return done(null, data[0]);
    }).catch(function(err) {
      return done(err, null);
    });
});

module.exports = passport;
