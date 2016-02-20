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

// render New page if it is called
function renderNew() {
  router.get('/restaurants/new', function(req, res, next) {
    res.render('new');
  });
}

// render show page for specific restaurant when it is called
function renderShow() {
  router.get('/restaurants/:id', function(req, res, next) {
    var restId = req.params.id;
    for (var i = 0; i < restaurants.length; i++ ) {
      if (restId === restaurants[i]) {
        res.render('show', restaurants[restId]);
      } else {
        res.render('error');
      }
    }
  });
}

// render restaurant edit page of identified restaurant OR
// render restaurant new page if new is called OR
// render Show page of identified restaurant OR
// render home page if no params are passed or restaurant is the first param
function renderPages () {
  router.get('/:p1?/:p2?/:p3?', function(req, res, next) {
    var p1 = req.params.p1;
    var p2 = req.params.p2;
    var p3 = req.params.p3;
    if (p1 === 'restaurants' && p2 && p3 === 'edit') {
      renderEdit();
    } else if (p1 === 'restaurants' && p2 === 'new') {
      res.render('new');
    } else if (p1 && p2 && p2 !== 'new') {
      renderShow();
    } else if (!p1 || p1 === 'restaurants') {
      renderHome();
    }
  });
}

renderPages();

module.exports = router;
