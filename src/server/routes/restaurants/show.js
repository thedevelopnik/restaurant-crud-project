module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var resArray = [];
  var reviewArray = [];

  pg.connect(db, function(err, client, done) {

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
};
