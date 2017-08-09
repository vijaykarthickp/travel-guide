exports.home = function(req, res) {
  res.render('index');
}

exports.home_search = function(req, res){
  if(req.body.city && 'new york' == req.body.city.toLowerCase()) {
    res.redirect('/city/nyc');
  }
}

exports.city_show = function(req, res) {
  res.render('city', {city: req.params.city});
}
