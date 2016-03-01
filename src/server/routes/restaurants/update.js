module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var updateRes = req.body;
  console.log(updateRes)

  knex('restaurants').where('id', id)
    .update({
      name: updateRes.name,
      city: updateRes.city,
      state: updateRes.state,
      cuisine: updateRes.cuisine,
      image: updateRes.image,
      descrip: updateRes.descrip
    }).then(function(data) {
      res.redirect('/restaurants/' + id);
    });
};
