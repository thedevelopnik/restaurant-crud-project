var express = require('express');
var router = express.Router();
var pages = require('./pages');
var restaurants = require('./restaurants');
var restaurantNames = Object.keys(restaurants);


// render restaurant edit page of identified restaurant OR
// render restaurant new page if new is called OR
// render Show page of identified restaurant OR
// render home page if no params are passed or restaurant is the first param
router.get('/:page?', function(req, res, next) {
  var page = req.params.page;
  if (!page) {
    res.render('index', {restaurants: restaurants});
  } else if (page === 'restaurants') {
    res.redirect('/');
  }
});

router.get('/restaurants/:id/edit', function(req, res, next) {
  var restId = req.params.id;
  var thisRestaurant;
  for (var i = 0; i < restaurantNames.length; i++ ) {
    if (restId === restaurantNames[i]) {
      thisRestaurant = restaurantNames[i];
    }
  }
  if (thisRestaurant) {
    res.render('edit',  restaurants[thisRestaurant]);
  } else {
    res.render('error');
  }
});

router.get('/restaurants/new', function(req, res, next) {
  res.render('new', pages['new']);
});

router.get('/restaurants/:id', function(req, res, next) {
  var restId = req.params.id;
  var thisRestaurant;
  for (var i = 0; i < restaurantNames.length; i++ ) {
    if (restId === restaurantNames[i]) {
      thisRestaurant = restaurantNames[i];
    }
  }
  if (thisRestaurant) {
    res.render('show', restaurants[thisRestaurant]);
  }
  else {
    res.render('error');
  }
});

module.exports = router;
