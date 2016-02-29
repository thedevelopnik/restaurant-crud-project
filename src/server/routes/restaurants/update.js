module.exports = function (req, res, next, pg, db) {
  console.log('made it into the edit backend');
  var updateRes = req.body;
  var resVars = Object.keys(updateRes);
  pg.connect(db, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    for (i = 0; i < resVars.length; i++) {
      var key = resVars[i];
      var value = updateRes[key];
      var query = client.query("update restaurants set " + key + "='" + value + "' " + "where id=" + req.params.id);
      query.on('end', function() {
        done();
      });
      }
    res.redirect('/restaurants/' + req.params.id);
    pg.end();
  });
};
