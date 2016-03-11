module.exports = {
  render: function (req, res, next) {
    console.log(req.user);
   res.render('login', {messages: req.flash('error')});
  },
};
