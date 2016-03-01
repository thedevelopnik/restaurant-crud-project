module.exports = function (req, res, next, knex) {
  var reviewArray = [];
  var resId = req.params.id;
  var reviewId = req.params.reviewid;

  pg.connect(db, function(err, client, done) {
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
};
