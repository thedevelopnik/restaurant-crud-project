var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next) {
  var id = req.params.id;
  var resInfo;
  queries.findRes(id)
    .then(function(data) {
      resInfo = data[0];
    }).then(function(data) {
      res.render('restaurants/edit', {restaurants: resInfo});
    });
};
