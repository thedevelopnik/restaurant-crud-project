module.exports = {
  insertRes: function(newRes) {
    return knex('restaurants').insert({
      name: newRes.name,
      city: newRes.city,
      state: newRes.state,
      cuisine: newRes.cuisine,
      image: newRes.image,
      descrip: newRes.descrip
    });
  },
  getNewRes: function(newRes) {
    return knex('restaurants').select('id').where('name', newRes.name);
  }
};
