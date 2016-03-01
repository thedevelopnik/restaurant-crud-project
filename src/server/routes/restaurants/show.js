module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var restaurantInfo;
  var reviews;

  knex('restaurants').select().where('id', id)
    .catch(function(err) {
      console.log(err);
    })
    .then(function(data) {
      restaurantInfo = data;
    });

  knex('reviews').select().where('res_id', id)
    .catch(function(err) {
      console.log(err);
    }).then(function(data) {
      reviews = data;
    }).then(function(data) {
      res.render('restaurants/show', {restaurants: restaurantInfo[0], reviews: reviews});
    });
  // pg.connect(db, function(err, client, done) {
  //
  //   if(err) {
  //     console.log(err);
  //     done();
  //     return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
  //   }
  //
  //   var queryResInfo = client.query('select * from restaurants where id=' + id);
  //   queryResInfo.on('row', function(row) {
  //     resArray.push(row);
  //   });
  //   queryResInfo.on('end', function() {
  //     done();
  //   });
  //
  //   var queryRevs = client.query('select * from reviews where res_id=' + id);
  //   queryRevs.on('row', function(row) {
  //     reviewArray.push(row);
  //   });
  //
  //   queryRevs.on('end', function() {
  //     res.render('restaurants/show', {restaurants: resArray[0], reviews: reviewArray});
  //     done();
  //   });
  //    pg.end();
  // });
};
