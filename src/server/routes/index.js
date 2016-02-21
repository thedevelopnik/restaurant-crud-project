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

var restaurants = [
  {'los-tacos':
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
  },
  {'burger-bar': {
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
  },
  {'pasta-freddys': {
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
  },
  {'bangkok-grill': {
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
  },
  {'pho-mazing': {
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
  },
  {'fiestaritos': {
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
  }
];


//render home page if no params or if param is restaurants
function renderHome() {
  router.get('/:page?', function(req, res, next) {
    var page = req.params.page;
    if (!page || page === 'restaurants') {
      res.render('index', pages['/']);
    }
  });
}


// render edit page if edit is called and there is a matching id
function renderEdit() {
  router.get('/restaurants/:id/edit', function(req, res, next) {
    var restId = req.params.id;
    var restaurant;
    for (var i = 0; i < restaurants.length; i++ ) {
      if (restId === restaurants[i]) {
        restaurant = restaurants[i];
      }
    }
    if (restaurant) {
      res.render('edit',  restaurant);
    } else {
      res.render('error');
    }
  });
}


// render New page if it is called
function renderNew() {
  router.get('/restaurants/new', function(req, res, next) {
    res.render('new', pages['new']);
  });
}


// render show page for specific restaurant when it is called
function renderShow() {
  router.get('/restaurants/:id', function(req, res, next) {
    var restId = req.params.id;
    var restaurant;
    for (var i = 0; i < restaurants.length; i++ ) {
      if (restId === restaurants[i]) {
        restaurant = restaurants[i];
      }
    }
    if (restaurant) {
      res.render('show', restaurant);
    }
    else {
      res.render('error');
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

renderShow();

module.exports = router;
