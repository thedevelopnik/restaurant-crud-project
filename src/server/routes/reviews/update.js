module.exports = function (req, res, next, knex, cb) {

  var updateReview = req.body;
  var revId = req.params.reviewid;
  var id = req.params.id;
  var ratingInt = Number(updateReview.rating);
  var rating;

  knex('reviews').where({
    res_id: id,
    id: revId})
  .update({
    res_id: id,
    rev_name: updateReview.revName,
    rev_date: updateReview.revDate,
    rating: ratingInt,
    review: updateReview.review,
  }).then(function(data) {
    console.log(data);
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
