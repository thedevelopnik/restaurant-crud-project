var queries = require('../../queries/restaurantQueries');

module.exports = function (req, res, next) {
  var newRes = req.body;

  queries.insertRes(newRes).catch(function(err) {
    console.log(err);
  })
  .then(function(data) {
    queries.getNewRes(newRes);
  }).then(function(data) {
    console.log(data);
    var newId = data[0].id;
    res.redirect('/restaurants/' + newId);
  }).catch(function(err) {
    return req.flash('danger', 'You cannot enter the same restaurant twice.');
  }).then(function() {
    var flash = req.flash().danger;
    res.render('restaurants/new', {messages: flash, restaurant: newRes});
  });
};
