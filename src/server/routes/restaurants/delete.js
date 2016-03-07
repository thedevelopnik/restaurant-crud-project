var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next) {
  queries.deleteRes(req.params.id)
    .then(function (data) {
      res.redirect('/');
    });
};
