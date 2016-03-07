var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next, knex) {
  res.render('restaurants/new');
};
