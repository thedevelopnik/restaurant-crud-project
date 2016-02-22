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
  console.log('renderEdit has fired');
  router.get('/restaurant/:id/edit', function(req, res, next) {
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
}


// render New page if it is called
function renderNew() {
  router.get('/restaurants/new', function(req, res, next) {
    res.render('new', pages['new']);
  });
}


// render show page for specific restaurant when it is called
function renderShow(par1, par2, par3) {
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
}
