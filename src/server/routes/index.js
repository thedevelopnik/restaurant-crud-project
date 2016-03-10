var queries = require('../queries/restaurantQueries');

module.exports = function(req, res, next) {
  var page = req.params.page;
  var resArray = [];
    queries.allRes()
    .then(function(data) {
      console.log(req.flash());
      res.render('index', {restaurants: data, user: req.user, messages: req.flash('success')});
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json({status: 'error', message: err});
    });
};
