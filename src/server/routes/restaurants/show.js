var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var restaurantInfo;
  var reviews;

  queries.findRes(id)
    .catch(function(err) {
      console.log(err);
    })
    .then(function(data) {
      restaurantInfo = data;
    });

  queries.findAllReviews(id)
    .catch(function(err) {
      console.log(err);
    }).then(function(data) {
      reviews = data;
    }).then(function(data) {
      res.render('restaurants/show', {restaurants: restaurantInfo[0], reviews: reviews});
    });
};
