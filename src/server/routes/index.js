var express = require('express');
var router = express.Router();

var restaurants = {
  1: {

  },
  2: {

  },
  3: {

  },
  4: {

  },
  5: {

  },
  6: {

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
