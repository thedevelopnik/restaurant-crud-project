var queries = require('../../queries/reviewQueries');

module.exports = function (req, res, next, knex) {
  var reviewInfo;
  var resId = req.params.id;
  var reviewId = req.params.reviewid;

  knex('reviews').where({
    res_id: resId,
    id: reviewId
  }).then(function(data) {
    reviewInfo = data[0];
    res.render('reviews/edit', {review: reviewInfo});
  });
};
