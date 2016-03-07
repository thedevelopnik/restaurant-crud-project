module.exports = {
  insertRev: function(id, newRev, ratingInt) {
    return knex('reviews').insert({
      res_id: id,
      rev_name: newRev.revName,
      rev_date: newRev.revDate,
      rating: ratingInt,
      review: newRev.review,
    });
  },
  getRating: function(id) {
    return knex('reviews').select('rating').where('res_id', id);
  },
  upRating: function(id, data) {
    return knex('restaurants').where('id', id)
    .update('rating', data);
  },
  findRev: function(resId, reviewId) {
    return knex('reviews').where({
      res_id: resId,
      id: reviewId
    });
  },
  upRev: function(id, revId, updateReview, ratingInt) {
    return knex('reviews').where({
      res_id: id,
      id: revId})
    .update({
      res_id: id,
      rev_name: updateReview.revName,
      rev_date: updateReview.revDate,
      rating: ratingInt,
      review: updateReview.review
    });
  }
};
