var queries = require('../../queries/reviewQueries');

module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var resInfo;

  knex('restaurants').where('id', id)
    .then(function(data) {
      resInfo = data[0];
      res.render('reviews/new', {restaurants: resInfo});
    });
};
