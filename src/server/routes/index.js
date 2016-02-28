var express = require('express');
var router = express.Router();
var pg = require('pg');
var Promise = require('bluebird');
Promise.promisifyAll(pg);
var connectionString = 'postgres://localhost:5432/gTables';


// render restaurant edit page of identified restaurant OR
// render restaurant new page if new is called OR
// render Show page of identified restaurant OR
// render home page if no params are passed or restaurant is the first param
router.get('/:page?', function(req, res, next) {
  var page = req.params.page;
  var responseArray = [];
  if (!page) {
    pg.connect(connectionString, function(err, client, done) {

      if(err) {
        console.log(err);
        done();
        return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
      }

      var query = client.query('select * from restaurants');
      console.log(query);
      query.on('row', function(row) {
        responseArray.push(row);
      });

      query.on('end', function() {
        res.render('index', {restaurants: responseArray});
        done();
      });
       pg.end();
    });
  } else if (page === 'restaurants') {
    res.redirect('/');
  }
});

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

router.get('/restaurants/new', function(req, res, next) {
  res.render('restaurants/new');
});

router.get('/restaurants/:id', function(req, res, next) {
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
      res.render('restaurants/show', {restaurants: responseArray[0]});
      done();
    });
     pg.end();
  });
});

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

router.post('/restaurants/:id/edit', function(req, res, next) {
  console.log('made it into the edit backend');
  var updateRes = req.body;
  console.log(updateRes);
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
        console.log('You made it this far!');
        done();
      });
      }
    res.redirect('/restaurants/' + req.params.id);
    pg.end();
  });
});

router.get('/restaurants/:id/reviews/new', function(req, res, next) {
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
      res.render('reviews/new', {restaurants: responseArray[0]});
      done();
    });
     pg.end();
  });
});

router.post('/restaurants/:id/reviews', function(req, res, next) {
  var newRev = req.body;
  console.log(newRev);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var queryPOST = client.query("insert into reviews (res_id, rev_name, rev_date, review) values (" + req.params.id + ", '" + newRev.revName + "', '" + newRev.revDate + "', " + newRev.rating + ", '" + newRev.review + "')");
    queryPOST.on('end', function() {
      res.redirect('/restaurants/' + req.params.id);
    });
    pg.end();
  });
});

module.exports = router;
