var express = require('express');
var router = express.Router();
var pages = require('./pages');
var restaurants = require('./restaurants');
var restaurantNames = Object.keys(restaurants);


// render restaurant edit page of identified restaurant OR
// render restaurant new page if new is called OR
// render Show page of identified restaurant OR
// render home page if no params are passed or restaurant is the first param
function renderPages () {
  router.get('/:p1?/:p2?/:p3?', function(req, res, next) {
    var p1 = req.params.p1;
    var p2 = req.params.p2;
    var p3 = req.params.p3;
    var thisRestaurant;
    if (p1 === 'restaurants' && p2 && p3 === 'edit') {
      for (i = 0; i < restaurantNames.length; i++ ) {
        if (p2 === restaurantNames[i]) {
          thisRestaurant = restaurantNames[i];
        }
      }
      if (thisRestaurant) {
        res.render('edit',  restaurants[thisRestaurant]);
      } else {
        res.render('error');
      }
    } else if (p1 === 'restaurants' && p2 === 'new') {
      res.render('new', pages['new']);
    } else if (p1 && p2 && p2 !== 'new') {
      for (i = 0; i < restaurantNames.length; i++ ) {
        if (p2 === restaurantNames[i]) {
          thisRestaurant = restaurantNames[i];
        }
      }
      if (thisRestaurant) {
        res.render('show', restaurants[thisRestaurant]);
      }
      else {
        res.render('error');
      }
    } else if (!p1 || p1 === 'restaurants') {
      res.render('index', pages['/']);
    }
  });
}

renderPages();

module.exports = router;
