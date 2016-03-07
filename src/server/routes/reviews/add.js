var queries = require('../../queries/reviewQueries');

module.exports = function (req, res, next, cb) {
  var id = req.params.id;
  var newRev = req.body;
  var ratingInt = Number(newRev.rating);
  var rating;

  queries.insertRev(id, newRev, ratingInt)
    .catch(function(err) {
      req.flash('danger', err.detail);
      res.redirect('/restaurants/' + id + '/reviews/new');
    })
    .then(function() {
        queries.getRating(id)
      .then(function(data) {
        return cb(data);
      }).then(function(data) {
        queries.upRating(id, data)
        .catch(function(err) {
        console.log(err);
        }).then(function(data) {
          res.redirect('/restaurants/' + id);
        });
      });
    });
};
