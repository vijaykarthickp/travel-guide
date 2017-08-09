const express = require('express');
const app = express();
var path    = require("path");
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

// view engine setup
var hbs = exphbs.create({ /* config */ });
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

require('./routes').initialize(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
