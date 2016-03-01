module.exports = function (req, res, next, knex) {
  var newRes = req.body;

  knex('restaurants').insert({
    name: newRes.name,
    city: newRes.city,
    state: newRes.state,
    cuisine: newRes.cuisine,
    image: newRes.image,
    descrip: newRes.descrip
  }).catch(function(err) {
    console.log(err);
  })
  .then(function(data) {
    return knex('restaurants').select('id').where('name', newRes.name);
  }).then(function(data) {
    console.log(data);
    var newId = data[0].id;
    res.redirect('/restaurants/' + newId);
  });
};
