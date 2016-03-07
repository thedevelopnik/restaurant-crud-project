var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var updateRes = req.body;

  queries.upRes(updateRes, id)
    .then(function(data) {
      res.redirect('/restaurants/' + id);
    });
};
