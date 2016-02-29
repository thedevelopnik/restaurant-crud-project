module.exports = function (req, res, next, pg, db) {
  pg.connect(db, function(err, client, done) {
    if(err) {
      res.status(500).json({status: 'error',message: 'Something didn\'t work'});
      done();

    }
    var query = client.query('delete from restaurants where id=' + req.params.id);

    query.on('end', function() {
      res.status(200).json({status: 'success', message: 'You deleted the restaurant!'});
      done();
    });
    pg.end();
  });
};
