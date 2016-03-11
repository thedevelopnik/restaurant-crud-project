var express = require('express');
var router = express.Router();
var pg = require('pg');
var renderNewRes = require('./restaurants/new.js');
var renderIndex = require('./index.js');
var renderShowRes = require('./restaurants/show.js');
var renderEditRes = require('./restaurants/edit.js');
var deleteRes = require('./restaurants/delete.js');
var addRes = require('./restaurants/add.js');
var updateRes = require('./restaurants/update.js');
var renderNewReview = require('./reviews/new.js');
var addReview = require('./reviews/add.js');
var renderEditReview = require('./reviews/edit.js');
var updateReview = require('./reviews/update.js');
var login = require('./login');
var passport = require('../lib/passport');
var helpers = require('../lib/helpers');

function findAvg (array) {
  var ratingAvg = 0;
  array.forEach(function(el, ind, arr) {
    num = Number(el.rating);
    return ratingAvg += num;
  });
  ratingAvg = (ratingAvg / array.length);
  ratingAvg = (Math.round(ratingAvg * 2)/2).toFixed(1);
  return ratingAvg;
}


// render index if there is no parameter
router.get('/', function(req, res, next) {
  renderIndex(req, res, next);
});

// render the new page
router.get('/restaurants/new', helpers.ensureAdmin, function(req, res, next) {
  renderNewRes(req, res, next);
});

// render the show page for a particular restaurant
router.get('/restaurants/:id', function(req, res, next) {
  renderShowRes(req, res, next);
});

//render a restaurant's edit page if that restaurant's id is in the url with edit
router.get('/restaurants/:id/edit', helpers.ensureAdmin, function(req, res, next) {
  renderEditRes(req, res, next);
});

//delete a restaurant
router.get('/restaurants/:id/delete', helpers.ensureAdmin, function(req, res, next) {
  deleteRes(req, res, next);
});


//add a new restaurant when the submit button is clicked on the new res page
router.post('/restaurants', helpers.ensureAdmin, function(req, res, next) {
  addRes(req, res, next);
});


//update the database when the submit button is clicked on the edit page
router.post('/restaurants/:id/edit', helpers.ensureAdmin, function(req, res, next) {
  updateRes(req, res, next);
});


//render the new review page for a restaurant
router.get('/restaurants/:id/reviews/new', helpers.ensureAuthenticated, function(req, res, next) {
  renderNewReview(req, res, next);
});


//add a review to the database when the submit button is clicked on a new review
router.post('/restaurants/:id/reviews', helpers.ensureAuthenticated, function(req, res, next) {
  addReview(req, res, next, findAvg);
});


// render the edit page for a particular review
router.get('/restaurants/:id/reviews/:reviewid/edit', helpers.ensureAuthenticated, function(req, res, next) {
  renderEditReview(req, res, next);
});


// update the database when an edited review is submitted
router.post('/restaurants/:id/reviews/:reviewid', helpers.ensureAuthenticated, function(req, res, next) {
  updateReview(req, res, next, findAvg);
});

// render login page when login link is clicked
router.get('/login', function(req, res, next) {
  login.render(req, res, next);
});

// login and redirect to home page when user clicks login submit
router.post('/login',
  passport.authenticate('local', {successRedirect: '/', successFlash: true, failureRedirect: '/login', failureFlash: true}));

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

router.get('/facebook/login', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}),
function (req, res, next) {
  res.redirect('/');
});

module.exports = router;
