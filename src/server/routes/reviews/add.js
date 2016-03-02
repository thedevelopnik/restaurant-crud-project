module.exports = function (req, res, next, knex, cb) {
  var id = req.params.id;
  var newRev = req.body;
  var ratingInt = Number(newRev.rating);
  var rating;

  knex('reviews').insert({
    res_id: id,
    rev_name: newRev.revName,
    rev_date: newRev.revDate,
    rating: ratingInt,
    review: newRev.review,
  }).then(function() {
    knex('reviews').select('rating').where('res_id', id)
    .then(function(data) {
      console.log('The ratings are ' + data[0].rating + data[1].rating);
      return cb(data);
    }).then(function(data) {
      knex('restaurants').where('id', id)
      .update('rating', data)
      .catch(function(err) {
      console.log(err);
      }).then(function(data) {
        res.redirect('/restaurants/' + id);
      });
    });
});






  // // pg.connect(db, function(err, client, done) {
  // //   if(err) {
  // //     done();
  // //     return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
  // //   }
  // //
  // //   var queryPOSTRev = client.query("insert into reviews (res_id, rev_name, rev_date, rating, review) values (" + req.params.id + ", '" + newRev.revName + "', '" + newRev.revDate + "', " + ratingInt + ", '" + newRev.review + "')");
  // //   queryPOSTRev.on('end', function() {
  // //     done();
  // //   });
  // //
  // //   var queryRevs = client.query('select rating from reviews where res_id=' + req.params.id);
  // //   queryRevs.on('row', function(row) {
  // //     reviewArray.push(row);
  // //   });
  // //
  // //   queryRevs.on('end', function() {
  // //     findAvg(reviewArray);
  // //     console.log(ratingAvg);
  // //     var queryUpdResRat = client.query('update restaurants set rating=' + ratingAvg + ' where id=' + req.params.id);
  // //     queryUpdResRat.on('end', function() {
  // //       res.redirect('/restaurants/' + req.params.id);
  // //       done();
  // //     });
  // //   });
  // //
  // //   pg.end();
  // });
};
