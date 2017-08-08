const express = require('express');
const app = express();
var path    = require("path");
var bodyParser = require('body-parser');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.post('/', function(req, res) {
  if(req.body.city && 'new york' == req.body.city.toLowerCase()) {
    res.sendFile(path.join(__dirname + '/public/nyc.html'));
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

