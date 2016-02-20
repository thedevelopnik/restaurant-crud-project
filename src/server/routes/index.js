var express = require('express');
var router = express.Router();
var restaurants = require('restaurants');
var pages = require('pages');

//render home page if no params or if param is restaurants
router.get('/:page?', function(req, res, next) {
  var page = req.params.page;
  if (!page || page === 'restaurants') {
    res.render('index', pages['/']);
  }
});

//render restaurant show page if id matches a restaurant's id
router.get('/restaurants/:id?', function(req, res, next) {
  var page = req.params.page;
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
