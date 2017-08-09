exports.home = function(req, res) {
  res.render('index');
}

exports.home_search = function(req, res){
  if(req.body.city && 'new york' == req.body.city.toLowerCase()) {
    res.redirect('/city');
  }
}

exports.city_show = function(req, res) {
  console.log(req.body.city);
  console.log(req.body.date);
  res.render('city', {city: req.params.city});

}
