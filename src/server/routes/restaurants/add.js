module.exports = function (req, res, next, knex) {
  var newRes = req.body;
  pg.connect(db, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var responseArray = [];
    var queryGET = client.query("select id from restaurants");
    queryGET.on('row', function(row) {
      responseArray.push(row);
    });
    var queryPOST = client.query("insert into restaurants (name, city, state, cuisine, image, descrip) values ('" + newRes.name + "', '" + newRes.city + "', '" + newRes.state + "', '" + newRes.cuisine + "', '" + newRes.image + "', '" + newRes.descrip + "')");
    queryGET.on('end', function() {
      res.redirect('/restaurants/' + (responseArray.length + 1));
    });
    pg.end();
  });
};
