module.exports = function (req, res, next, knex) {
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

  pg.connect(db, function(err, client, done) {
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
};
