var queries = require('../../queries/restaurantQueries');

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
};
