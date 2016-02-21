var express = require('express');
var router = express.Router();

var pages = {
  '/': {
    title: 'gTables',
    name: 'gTables',
    link: '/restaurants/new',
    linkText: 'New Restaurant'
  },
  'new': {
    title: 'New Restaurant',
    name: 'New Restaurant',
    link: '/restauran'
  }
};

var restaurants = {
'los-tacos':
  {
    name: 'Los Tacos',
    cuisine: 'Mexican Cuisine',
    city: 'Denver',
    state: 'CO',
    rating: 5,
    image: '/images/mexican.png',
    homeLink: "/",
    hlText: 'Home',
    desc: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'
  },
'burger-bar': {
    name: 'Burger Bar',
    cuisine: 'American Cuisine',
    city: 'Seattle',
    state: 'WA',
    rating: 5,
    image: '/images/burger.png',
    homeLink: "/",
    hlText: 'Home',
    desc: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'
  },
'pasta-freddys': {
    name: 'Pasta Freddy\'s',
    cuisine: 'Italian Cuisine',
    city: 'Sacramento',
    state: 'CA',
    rating: 3,
    image: '/images/italian.png',
    homeLink: "/",
    hlText: 'Home',
    desc: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'
  },
'bangkok-grill': {
    name: 'Bangkok Grill',
    cuisine: 'Thai Cuisine',
    city: 'Brooklyn',
    state: 'NY',
    rating: 2,
    image: '/images/thai.jpg',
    homeLink: "/",
    hlText: 'Home',
    desc: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'
  },
'pho-mazing': {
    name: 'Pho Mazing',
    cuisine: 'Vietnamese Cuisine',
    city: 'Boulder',
    state: 'CO',
    rating: 2,
    image: '/images/pho.jpg',
    homeLink: "/",
    hlText: 'Home',
    desc: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'
  },
'fiestaritos': {
    name: 'Fiestaritos',
    cuisine: 'Mexican Cuisine',
    city: 'Lincoln',
    state: 'NE',
    rating: 1,
    image: '/images/mexican.png',
    homeLink: "/",
    hlText: 'Home',
    desc: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'
  }
};

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
