var express = require('express');
var router = express.Router();
var restaurants = require('restaurants');
var pages = require('pages');

//render home page if no params or if param is restaurants
function renderHome() {
  router.get('/:page?', function(req, res, next) {
    res.render('index', pages['/']);
  });
}

// render edit page if edit is called and there is a matching id
function renderEdit() {
  router.get('/restaurants/:id/edit', function(req, res, next) {
    var restId = req.params.id;
    for (var i = 0; i < restaurants.length; i++ ) {
      if (restId === restaurants[i]) {
        res.render('edit', restaurants[restId]);
      } else {
        res.render('error');
      }
    }
  });
}

function renderNew() {
  router.get('/restaurants/new', function(req, res, next) {
    res.render('new');
  });
}

function renderShow() {
  router.get('/restaurants/:id/edit', function(req, res, next) {
    var restId = req.params.id;
    res.render('show', restaurants[restId]);
  });
}

// render restaurant edit page of identified restaurant OR
// render restaurant new page if new
function renderPages () {
  router.get('/restaurants/:id?/:edit?', function(req, res, next) {
    var restId = req.params.id;
    var command = req.params.command;
    if (!!command && command === 'edit') {
      res.render('edit', restaurants[restId]);
    } else if (!!command && command === 'new') {
      res.render('new');
    } else if (!command && !!id) {
      res.render('show', restaurants[restId]);
    } else if (!command && !id) {
      callback();
    }
  });
}

renderPages();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
