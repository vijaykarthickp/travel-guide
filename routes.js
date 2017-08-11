const colors = require('colors');
const main_ctrl = require('./controllers/main_ctrl');

exports.initialize = function(app) {

  app.use(function(req,res,next){
    console.log(colors.yellow(Date.now()));
    next();
  });

  app.route('/list')
  .get(main_ctrl.list);

  console.log("asdsadsd");
  app.route('/')
    .get(main_ctrl.home)
    .post(main_ctrl.home_search);

  app.route('/city/:city/:date')
  .get(main_ctrl.city_show);


  app.route('/save/:season/:name')
  .post(main_ctrl.save_to_list);


}
