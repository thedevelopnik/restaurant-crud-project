var queries = require('../queries/restaurantQueries');

module.exports = function(req, res, next) {
  var page = req.params.page;
    queries.allRes()
    .then(function(data) {
      res.render('index', {restaurants: data, user: req.user, success: req.flash('success')});
    })
    .catch(function(err) {
      return res.status(500).json({status: 'error', message: err});
    });
};
