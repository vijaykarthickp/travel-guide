const jsonFile = require('jsonfile');
const async = require('async');
const colors = require('colors');
const url = require('url');

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
  const url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  console.log(query.filters);
  let city = req.params.city === 'nyc' ? 'newyorkcity' : req.params.city;
  let date = req.params.date;
  let processedData = {};
  let seasonData = {};
  let season = "";
  let listData = [
    {season: 'Spring', list:[]},
    {season: 'Summer', list:[]},
    {season: 'Autumn', list:[]},
    {season: 'Winter', list:[]}
  ];
  let seasonQuery = query.seasons;
  async.waterfall([
    //Search for processed data
    function(callback){
      const data = process.cwd() + '/data.json';
      const dateExp = date.split('-');
      const month = dateExp[1]*1;

      season = month >=3 & month <=5 ? 'Spring' : '';
      season = !season && month >=6 & month <=8 ? 'summer' : season;
      season = !season && month >= 9 && month <= 11 ? 'autumn' : season;
      season = !season && (month > 11 || month < 3) ? 'winter' : season;

      jsonFile.readFile(data, function(err, jsonString) {
        if(err)
          return callback(err);

         let searchData = new Array();

         Object.keys(jsonString[city])
         .forEach((property) => {
           searchData[property] = new Array();
           Object.keys(jsonString[city][property]).forEach((index) => {
             if (typeof jsonString[city][property][index].tags == "undefined") {
                searchData[property].push(jsonString[city][property][index]);
              }
              else if (seasonQuery) {
                seasonsQ = seasonQuery.split(',');
                seasonsQ.forEach(function(season_q) {
                  if ( jsonString[city][property][index].tags.indexOf(season_q) != -1) {
                    searchData[property].push(jsonString[city][property][index]);
                  }
                });
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
      filters = query.filters;

      let filterObj = {};
      if (typeof filters !="undefined" && filters!="") {

        filters = filters.split(',');
        filters.forEach(function(filter) {
          if (filter == 'hotels') {
            filterObj.hotels = "true";
          }
          if (filter == 'events') {
            filterObj.events = "true";
          }
          if (filter == 'things_todo') {
            filterObj.things_todo = "true";
          }
          if (filter == 'restaurants') {
            filterObj.restaurants = "true";
          }
        });

        if (typeof filterObj.hotels == "undefined") {
          delete result['hotels'];
        }
        if (typeof filterObj.events == "undefined") {
          delete result['events'];
        }
        if (typeof filterObj.things_todo == "undefined") {
          delete result['things-todo'];
        }
        if (typeof filterObj.restaurants == "undefined") {
          delete result['restaurants'];
        }
      }
      else {

        filterObj.hotels = "true";
        filterObj.events = "true";
        filterObj.things_todo = "true";
        filterObj.restaurants = "true";
      }
      filterObj[season] = "true";
      if (typeof seasonQuery !="undefined" && seasonQuery!="") {
        seasonsQ = seasonQuery.split(',');
        seasonsQ.forEach(function(season_q) {
          if (season_q == "summer") {
            filterObj['summer'] = 'true';
          }
          if (season_q == "winter") {
            filterObj['winter'] = 'true';
          }
          if (season_q == "spring") {
            filterObj['spring'] = 'true';
          }
          if (season_q == "autumn") {
            filterObj['autumn'] = 'true';
          }
        });
      }
      else {

      }
      console.log(filterObj);
      console.log(seasonQuery);
      return res.render('city', {
        city: city,
        date: date,
        data: result,
        listData: listData,
        filter : filterObj,
        season : season,
      });
    }
  });

}


exports.save_to_list = function(req, res){

}
