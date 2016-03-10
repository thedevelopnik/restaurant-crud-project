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

function findAvg (array) {
  var ratingAvg = 0;
  array.forEach(function(el, ind, arr) {
    num = Number(el.rating);
    return ratingAvg += num;
  });
  ratingAvg = (ratingAvg / array.length);
  ratingAvg = (Math.round(ratingAvg * 2)/2).toFixed(1);
  console.log('final avg is ' + ratingAvg);
  return ratingAvg;
}


// render index if there is no parameter, redirect to index if the parameter is 'restaurant'
router.get('/', function(req, res, next) {
  renderIndex(req, res, next);
});

// render the new page
router.get('/restaurants/new', function(req, res, next) {
  renderNewRes(req, res, next);
});

// render the show page for a particular restaurant
router.get('/restaurants/:id', function(req, res, next) {
  renderShowRes(req, res, next);
});

//render a restaurant's edit page if that restaurant's id is in the url with edit
router.get('/restaurants/:id/edit', function(req, res, next) {
  renderEditRes(req, res, next);
});

//delete a restaurant
router.get('/restaurants/:id/delete', function(req, res, next) {
  deleteRes(req, res, next);
});


//add a new restaurant when the submit button is clicked on the new res page
router.post('/restaurants', function(req, res, next) {
  addRes(req, res, next);
});


//update the database when the submit button is clicked on the edit page
router.post('/restaurants/:id/edit', function(req, res, next) {
  updateRes(req, res, next);
});


//render the new review page for a restaurant
router.get('/restaurants/:id/reviews/new', function(req, res, next) {
  renderNewReview(req, res, next);
});


//add a review to the database when the submit button is clicked on a new review
router.post('/restaurants/:id/reviews', function(req, res, next) {
  addReview(req, res, next, findAvg);
});


// render the edit page for a particular review
router.get('/restaurants/:id/reviews/:reviewid/edit', function(req, res, next) {
  renderEditReview(req, res, next);
});


// update the database when an edited review is submitted
router.post('/restaurants/:id/reviews/:reviewid', function(req, res, next) {
  updateReview(req, res, next, findAvg);
});

// render login page when login link is clicked
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
