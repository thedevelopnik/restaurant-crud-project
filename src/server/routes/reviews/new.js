module.exports = function (req, res, next, pg, db) {
  var id = req.params.id;
  var resArray = [];
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
      res.render('reviews/new', {restaurants: resArray[0]});
      done();
    });
    pg.end();
  });
};
