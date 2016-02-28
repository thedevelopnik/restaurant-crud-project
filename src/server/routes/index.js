var express = require('express');
var router = express.Router();
var pg = require('pg');
var Promise = require('bluebird');
Promise.promisifyAll(pg);
var connectionString = 'postgres://localhost:5432/gTables';


// render index if there is no parameter, redirect to index if the parameter is 'restaurant'
router.get('/:page?', function(req, res, next) {
  var page = req.params.page;
  var resArray = [];
  if (!page) {
    pg.connect(connectionString, function(err, client, done) {

      if(err) {
        console.log(err);
        done();
        return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
      }

      var queryResInfo = client.query('select * from restaurants');
      queryResInfo.on('row', function(row) {
        resArray.push(row);
      });
      queryResInfo.on('end', function() {
        res.render('index', {restaurants: resArray});
        done();
      });
       pg.end();
    });
  } else if (page === 'restaurants') {
    res.redirect('/');
  }
});


//render a restaurant's edit page if that restaurant's id is in the url with edit
router.get('/restaurants/:id/edit', function(req, res, next) {
  var id = req.params.id;
  var responseArray = [];
  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      console.log(err);
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    var query = client.query('select * from restaurants where id=' + id);
    query.on('row', function(row) {
      responseArray.push(row);
    });

    query.on('end', function() {
      console.log(responseArray);
      res.render('restaurants/edit', {restaurants: responseArray[0]});
      done();
    });
     pg.end();
  });
});


// render the new page
router.get('/restaurants/new', function(req, res, next) {
  res.render('restaurants/new');
});


// render the show page for a particular restaurant
router.get('/restaurants/:id', function(req, res, next) {
  var id = req.params.id;
  var resArray = [];
  var reviewArray = [];

  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      console.log(err);
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    var queryResInfo = client.query('select * from restaurants where id=' + id);
    queryResInfo.on('row', function(row) {
      resArray.push(row);
    });
    queryResInfo.on('end', function() {
      done();
    });

    var queryRevs = client.query('select * from reviews where res_id=' + id);
    queryRevs.on('row', function(row) {
      reviewArray.push(row);
    });

    queryRevs.on('end', function() {
      res.render('restaurants/show', {restaurants: resArray[0], reviews: reviewArray});
      done();
    });
     pg.end();
  });
});


//delete a restaurant
router.delete('/restaurants/:id', function(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      res.status(500).json({status: 'error',message: 'Something didn\'t work'});
      done();

    }
    var query = client.query('delete from restaurants where id=' + req.params.id);

    query.on('end', function() {
      res.status(200).json({status: 'success', message: 'You deleted the restaurant!'});
      done();
    });
    pg.end();
  });
});


//add a new restaurant when the submit button is clicked on the new res page
router.post('/restaurants', function(req, res, next) {
  var newRes = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var responseArray = [];
    var queryGET = client.query("select id from restaurants");
    queryGET.on('row', function(row) {
      responseArray.push(row);
    });
    var queryPOST = client.query("insert into restaurants (name, city, state, cuisine, image, descrip) values ('" + newRes.name + "', '" + newRes.city + "', '" + newRes.state + "', '" + newRes.cuisine + "', '" + newRes.image + "', '" + newRes.descrip + "')");
    queryGET.on('end', function() {
      res.redirect('/restaurants/' + (responseArray.length + 1));
    });
    pg.end();
  });
});


//update the database when the submit button is clicked on the edit page
router.post('/restaurants/:id/edit', function(req, res, next) {
  console.log('made it into the edit backend');
  var updateRes = req.body;
  var resVars = Object.keys(updateRes);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    for (i = 0; i < resVars.length; i++) {
      var key = resVars[i];
      var value = updateRes[key];
      var query = client.query("update restaurants set " + key + "='" + value + "' " + "where id=" + req.params.id);
      query.on('end', function() {
        done();
      });
      }
    res.redirect('/restaurants/' + req.params.id);
    pg.end();
  });
});


//render the new review page for a restaurant
router.get('/restaurants/:id/reviews/new', function(req, res, next) {
  var id = req.params.id;
  var resArray = [];
  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      console.log(err);
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    var queryResInfo = client.query('select * from restaurants where id=' + id);
    queryResInfo.on('row', function(row) {
      resArray.push(row);
    });
    queryResInfo.on('end', function() {
      res.render('reviews/new', {restaurants: resArray[0]});
      done();
    });
    pg.end();
  });
});


//add a review to the database when the submit button is clicked on a new review
router.post('/restaurants/:id/reviews', function(req, res, next) {
  function findAvg (array) {
    reviewArray.forEach(function(el, ind, arr) {
      return ratingAvg += el.rating;
    });
    ratingAvg = (ratingAvg / array.length);
    ratingAvg = (Math.round(ratingAvg * 2)/2).toFixed(1);
  }

  var newRev = req.body;
  ratingInt = Number(newRev.rating);
  var reviewArray = [];
  var ratingAvg = 0;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    var queryPOSTRev = client.query("insert into reviews (res_id, rev_name, rev_date, rating, review) values (" + req.params.id + ", '" + newRev.revName + "', '" + newRev.revDate + "', " + ratingInt + ", '" + newRev.review + "')");
    queryPOSTRev.on('end', function() {
      done();
    });

    var queryRevs = client.query('select rating from reviews where res_id=' + req.params.id);
    queryRevs.on('row', function(row) {
      reviewArray.push(row);
    });

    queryRevs.on('end', function() {
      findAvg(reviewArray);
      console.log(ratingAvg);
      var queryUpdResRat = client.query('update restaurants set rating=' + ratingAvg + ' where id=' + req.params.id);
      queryUpdResRat.on('end', function() {
        res.redirect('/restaurants/' + req.params.id);
        done();
      });
    });

    pg.end();
  });
});


// render the edit page for a particular review
router.get('/restaurants/:id/reviews/:reviewid/edit', function(req, res, next) {
  var reviewArray = [];
  var resId = req.params.id;
  var reviewId = req.params.reviewid;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var queryRevs = client.query('select * from reviews where res_id=' + resId + 'and id=' + reviewId);
    queryRevs.on('row', function(row) {
      reviewArray.push(row);
    });

    queryRevs.on('end', function() {
      res.render('reviews/edit', {review: reviewArray[0]});
    });

    pg.end();
  });
});


// update the database when an edited review is submitted
router.post('/restaurants/:id/reviews/:reviewid', function(req, res, next) {
  function findAvg (array) {
    reviewArray.forEach(function(el, ind, arr) {
      return ratingAvg += el.rating;
    });
    ratingAvg = (ratingAvg / array.length);
    ratingAvg = (Math.round(ratingAvg * 2)/2).toFixed(1);
  }

  var updateReview = req.body;
  var reviewVars = Object.keys(updateReview);
  ratingInt = Number(updateReview.rating);
  var reviewArray = [];
  var ratingAvg = 0;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    for (i = 0; i < reviewVars.length; i++) {
      var key = reviewVars[i];
      var value = updateReview[key];
      var query = client.query("update reviews set " + key + "='" + value + "' " + "where id=" + req.params.reviewid);
      query.on('end', function() {
        done();
      });
    }

    var queryRevs = client.query('select rating from reviews where res_id=' + req.params.id);
    queryRevs.on('row', function(row) {
      reviewArray.push(row);
    });

    queryRevs.on('end', function() {
      findAvg(reviewArray);
      console.log(ratingAvg);
      var queryUpdResRat = client.query('update restaurants set rating=' + ratingAvg + ' where id=' + req.params.id);
      queryUpdResRat.on('end', function() {
        res.redirect('/restaurants/' + req.params.id);
        done();
      });
    });

    pg.end();
  });
});

module.exports = router;
