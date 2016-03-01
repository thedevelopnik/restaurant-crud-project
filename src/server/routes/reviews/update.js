module.exports = function (req, res, next, knex) {
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

  pg.connect(db, function(err, client, done) {
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
};
