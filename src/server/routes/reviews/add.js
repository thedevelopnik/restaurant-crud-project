var revQueries = require('../../queries/reviewQueries');
var resQueries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next, cb) {
  var id = req.params.id;
  var newRev = req.body;
  var ratingInt = Number(newRev.rating);
  var rating;

  revQueries.insertRev(id, newRev, ratingInt)
    .then(function() {
        revQueries.getRating(id)
      .then(function(data) {
        return cb(data);
      }).then(function(data) {
        revQueries.upRating(id, data)
        .catch(function(err) {
        console.log(err);
        }).then(function(data) {
          res.redirect('/restaurants/' + id);
        });
      });
    }).catch(function(err) {
      return req.flash('danger', 'You can only leave one review per restaurant.');
    }).then(function() {
      var resInfo;
      var flash = req.flash().danger;
      resQueries.findRes(id)
        .then(function(data) {
          resInfo = data[0];
          res.render('reviews/new', {restaurants: resInfo, messages: flash, review: newRev});
        });
    });
};
