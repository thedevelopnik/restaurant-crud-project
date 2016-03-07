module.exports = {
  insertRev: function(id, newRev, ratingInt) {
    knex('reviews').insert({
      res_id: id,
      rev_name: newRev.revName,
      rev_date: newRev.revDate,
      rating: ratingInt,
      review: newRev.review,
    });
  },
  getRating: function(id) {
    knex('reviews').select('rating').where('res_id', id);
  },
  upRating: function(id, data) {
    knex('restaurants').where('id', id)
    .update('rating', data);
  },
  findRev: function(resId, reviewId) {
    knex('reviews').where({
      res_id: resId,
      id: reviewId
    });
  }
};
