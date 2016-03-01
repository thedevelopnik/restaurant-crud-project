module.exports = function (req, res, next, knex) {
  var id = req.params.id;
  var responseArray = [];
  pg.connect(db, function(err, client, done) {

    if(err) {
      console.log(err);
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    var query = client.query('select * from restaurants where id=' + id);
    query.on('row', function(row) {
      responseArray.push(row);
    });

    query.on('end', function() {
      console.log(responseArray);
      res.render('restaurants/edit', {restaurants: responseArray[0]});
      done();
    });
     pg.end();
  });
};
