module.exports = {
  render: function (req, res, next) {
   res.render('login', {messages: req.flash('error')});
  },
};
