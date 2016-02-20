var express = require('express');
var router = express.Router();

var restaurants = {
  1: {
    name: 'Los Tacos',
    cuisine: 'Mexican Cuisine',
    loc: 'Denver, CO'
  },
  2: {
    name: 'Burger Bar',
    cuisine: 'American Cuisine',
    loc: 'Seattle, WA'
  },
  3: {
    name: 'Pasta Freddy\'s',
    cuisine: 'Italian Cuisine',
    loc: 'Sacramento, CA'
  },
  4: {
    name: 'Bangkok Grill',
    cuisine: 'Thai Cuisine',
    loc: 'Brooklyn, NY'
  },
  5: {
    name: 'Pho Mazing',
    cuisine: 'Vietnamese Cuisine',
    loc: 'Boulder, CO'
  },
  6: {
    name: 'Fiestaritos',
    cuisine: 'Mexican Cuisine',
    loc: 'Lincoln, NE'
  }
};

var pages = {
  '/': {

  },


};

//render home page if no params or if param is restaurants
router.get('/:page?', function(req, res, next) {
  var page = req.params.page;
  if (!page || page === 'restaurants') {
    res.render('index', { title: 'Express' });
  }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
