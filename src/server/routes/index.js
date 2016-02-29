require('dotenv').config();
module.exports = function(req, res, next, pg, db) {
  var page = req.params.page;
  var resArray = [];
  if (!page) {
    pg.connect(db, function(err, client, done) {

      if(err) {
        console.log(err);
        done();
        return res.status(500).json({status: 'error',message: err});
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
};
