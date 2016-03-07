var queries = require('../queries/restaurantQueries');

module.exports = function(req, res, next, knex) {
  var page = req.params.page;
  var resArray = [];
  if (!page) {
    queries.AllRes()
    .then(function(data) {
      res.render('index', {restaurants: data});
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json({status: 'error',message: err});
    });
  } else if (page === 'restaurants') {
    res.redirect('/');
  }
};
