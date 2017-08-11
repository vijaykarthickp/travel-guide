const jsonFile = require('jsonfile');
const async = require('async');


exports.home = function(req, res) {
  res.render('index');
}

exports.home_search = function(req, res){
  if(req.body.city && 'new york' == req.body.city.toLowerCase()) {
    let city = 'nyc/'
    res.redirect('/city/'+city+req.body.date);
  }
}

exports.city_show = function(req, res) {
  console.log(req.params.city);
  console.log(req.params.date);

  let city = req.params.city === 'nyc' ? 'newyorkcity' : req.params.city;
  let date = req.params.date;
  let processedData = {};


  let listData = [
    {season: 'Spring', list:[]},
    {season: 'Summer', list:[]},
    {season: 'Autumn', list:[]},
    {season: 'Winter', list:[]}
  ];
console.log("END");
  async.waterfall([
    //Search for processed data
    function(callback){
      console.log("FR")
      const data = process.cwd() + '/data.json';
      const dateExp = date.split('-');
      const month = dateExp[1]*1;

      let season = month <=4 ? 'winter' : '';
      season = !season && month > 5 && month < 9 ? 'summer' : season;
      season = !season && month > 11 ? 'winter' : season;
      season = !season ? 'summer' : season;

      jsonFile.readFile(data, function(err, jsonString) {
        if(err)
          return callback(err);

         let searchData = new Array();
         console.log(jsonString[city]);

         Object.keys(jsonString[city])
         .forEach((property) => {
           searchData[property] = new Array();
           Object.keys(jsonString[city][property]).forEach((index) => {
             if (typeof jsonString[city][property][index].tags == "undefined") {
                searchData[property].push(jsonString[city][property][index]);
              }
              else if ( jsonString[city][property][index].tags.indexOf(season) != -1) {
                searchData[property].push(jsonString[city][property][index]);
              }
           });
         });

         return callback(null, searchData);
      });
    }
  ], function(err, result) {
    if(err){
      console.log(err);
      return res.render('city', {
        city: city,
        date: date,
        data: err
      });
    }else{
      return res.render('city', {
        city: city,
        date: date,
        data: result,
        listData: listData
      });
    }
  });

}


exports.save_to_list = function(req, res){

}
