var revQueries = require('../../queries/reviewQueries');
var resQueries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next, cb) {

  var updateReview = req.body;
  var revId = req.params.reviewid;
  var id = req.params.id;
  var ratingInt = Number(updateReview.rating);
  var rating;

  revQueries.upRev(id, revId, updateReview, ratingInt)
    .then(function(data) {
      console.log(data);
    }).then(function() {
      revQueries.getRating(id)
      .then(function(data) {
        return cb(data);
      }).then(function(data) {
        resQueries.findRes(id)
        .update('rating', data)
        .catch(function(err) {
        console.log(err);
        }).then(function(data) {
          res.redirect('/restaurants/' + id);
        });
      });
    });
};
