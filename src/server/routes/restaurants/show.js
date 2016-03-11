var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next) {
  var id = req.params.id;
  var restaurantInfo;
  var reviews;

  if (req.params.id === 'new') {
    res.redirect('/new');
  } else {

    queries.findRes(id)
      .then(function(data) {
        restaurantInfo = data;
      })
      .catch(function(err) {
        console.log(err);
      });

    queries.findAllReviews(id)
      .then(function(data) {
        reviews = data;
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function(data) {
        res.render('restaurants/show', {restaurants: restaurantInfo[0], user: req.user, reviews: reviews});
      });
  }
};
