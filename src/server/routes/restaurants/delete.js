module.exports = function (req, res, next, knex) {
  knex('restaurants').where('id', req.params.id).del()
    .then(function (data) {
      res.redirect('/');
    });
};
