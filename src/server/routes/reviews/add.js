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
};
