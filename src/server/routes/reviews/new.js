var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next) {
  var id = req.params.id;
  var resInfo;
  var flash = req.flash().danger;
  queries.findRes(id)
    .then(function(data) {
      resInfo = data[0];
      var params = {restaurants: resInfo,
      };
      console.log('This is bullshit ' + flash);
      if (flash) {
        params['messages'] = flash;
      }
      res.render('reviews/new', params);
    });
};
