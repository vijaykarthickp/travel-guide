const colors = require('colors');

exports.initialize = function(app) {

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.post('/', function(req, res) {
    if(req.body.city && 'new york' == req.body.city.toLowerCase()) {
      res.redirect('/city/nyc');
    }
  });

  app.get('/city/:city', function(req, res) {
    console.log(req.params.city);
    res.render('nyc');
  });

}
