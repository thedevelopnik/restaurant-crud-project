var passport = require('passport');
var LocalStrategy = require('passport-local');
var knex = require('../db/knex');
var helpers = require('./helpers');


passport.use(new LocalStrategy({
},
  function(username, password, done) {
    knex('users').where('username', username)
      .then(function(data) {
        var user = data[0];
        console.log(password, user.password);
        if (password === user.password) {
          console.log('user:', user);
          return done(null, user, {message: 'You\'re logged in!'});
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
    }).catch(function(err) {
      console.log('into the knex catch');
      console.log(err);
      return done(null, false, {message: 'Incorrect username.'});
    });
  }
));

// *** configure passport *** //
passport.serializeUser(function(user, done) {
  done(null, user.id);
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
