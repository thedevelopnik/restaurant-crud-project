var express = require('express');
var router = express.Router();
var pg = require('pg');
require('dotenv').config();
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
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/gTables';


// render index if there is no parameter, redirect to index if the parameter is 'restaurant'
router.get('/:page?', function(req, res, next) {
  renderIndex(req, res, next, pg, connectionString);
});

// render the new page
router.get('/restaurants/new', function(req, res, next) {
  renderNewRes(req, res, next, pg, connectionString);
});

// render the show page for a particular restaurant
router.get('/restaurants/:id', function(req, res, next) {
  renderShowRes(req, res, next, pg, connectionString);
});

//render a restaurant's edit page if that restaurant's id is in the url with edit
router.get('/restaurants/:id/edit', function(req, res, next) {
  renderEditRes(req, res, next, pg, connectionString);
});

//delete a restaurant
router.delete('/restaurants/:id', function(req, res, next) {
  deleteRes(req, res, next, pg, connectionString);
});


//add a new restaurant when the submit button is clicked on the new res page
router.post('/restaurants', function(req, res, next) {
  addRes(req, res, next, pg, connectionString);
});


//update the database when the submit button is clicked on the edit page
router.post('/restaurants/:id/edit', function(req, res, next) {
  updateRes(req, res, next, pg, connectionString);
});


//render the new review page for a restaurant
router.get('/restaurants/:id/reviews/new', function(req, res, next) {
  renderNewReview(req, res, next, pg, connectionString);
});


//add a review to the database when the submit button is clicked on a new review
router.post('/restaurants/:id/reviews', function(req, res, next) {
  addReview(req, res, next, pg, connectionString);
});


// render the edit page for a particular review
router.get('/restaurants/:id/reviews/:reviewid/edit', function(req, res, next) {
  renderEditReview(req, res, next, pg, connectionString);
});


// update the database when an edited review is submitted
router.post('/restaurants/:id/reviews/:reviewid', function(req, res, next) {
  updateReview(req, res, next, pg, connectionString);
});

module.exports = router;

// var promise = new Promise (function(resolve, reject) {
//   var queryRevs = client.query('select rating from reviews where res_id=' + req.params.id);
//   queryRevs.on('row', function(row) {
//     reviewArray.push(row);
//   });
//   queryRevs.on('end', function() {
//     return reviewArray;
//   });
// }).then(function(array) {
//   return findAvg(array);
// }).then(function(num) {
//   var queryUpdResRat = client.query('update restaurants set rating=' + num + ' where id=' + req.params.id);
//   queryUpdResRat.on('end', function() {
//     res.redirect('/restaurants/' + req.params.id);
//     done();
//   });
// });
