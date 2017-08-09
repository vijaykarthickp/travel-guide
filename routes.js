const colors = require('colors');
const main_ctrl = require('./controllers/main_ctrl');

exports.initialize = function(app) {

  app.use(function(req,res,next){
    console.log(colors.yellow(Date.now()));
    next();
  });

  app.route('/')
    .get(main_ctrl.home)
    .post(main_ctrl.home)

  app.route('/city')
  .post(main_ctrl.city_show);

}
