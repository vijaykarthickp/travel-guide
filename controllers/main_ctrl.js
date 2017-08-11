const jsonFile = require('jsonfile');
const async = require('async');
const colors = require('colors');
const url = require('url');

  let listData = [
    {
      season: 'Spring',
      list:[],
      count: 0
    },
    {
      season: 'Summer',
      list:[],
      count: 0
    },
    {
      season: 'Autumn',
      list:[],
      count: 0
    },
    {
     season: 'Winter',
     list:[],
     count: 0
    }
  ];

exports.home = function(req, res) {
  console.log("HOME");
  res.render('index');
}

exports.home_search = function(req, res){
  console.log('home_search');
  if(req.body.city && 'new york' == req.body.city.toLowerCase()) {
    let city = 'newyorkcity/'
    res.redirect('/city/'+city+req.body.date);
  }else {
    res.redirect('/city/'+req.body.city+"/"+req.body.date);
  }
}

exports.list = function(req, res){
  const url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let season_q = query.season;
  console.log(colors.red(season_q));
  let city = req.params.city === 'nyc' ? 'newyorkcity' : req.params.city;
  let date = req.params.date;
  let processedData = {};
  let season = 'summer';

  city = (city == '' || typeof city == "undefined") ? 'newyorkcity' : city;

     async.waterfall([
    //Search for processed data
    function(callback){
      const data = process.cwd() + '/list.json';

      jsonFile.readFile(data, function(err, jsonString) {
        if(err)
          callback(err);
         let searchData = new Array();
         for(const property in jsonString[city]) {
           searchData[property] = new Array();

           for(index in jsonString[city][property]) {
             searchData[property].push(jsonString[city][property][index]);
           }
         }
         return callback(null, searchData);
      });
    }
  ], function(err, result) {
    if(err){
      console.log(err);
      return res.render('list', {
        data: err
      });
    }else{
      console.log(colors.red(season_q));
      return res.render('list', {
        data: result,
        season: season_q
      });
    }
  });
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

      seasonCheck = month >=3 & month <=5 ? 'Spring' : '';
      seasonCheck = !seasonCheck && month >=6 & month <=8 ? 'summer' : seasonCheck;
      seasonCheck = !seasonCheck && month >= 9 && month <= 11 ? 'autumn' : seasonCheck;
      seasonCheck = !seasonCheck && (month > 11 || month < 3) ? 'winter' : seasonCheck;
      season = seasonCheck;
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
                  if ( jsonString[city][property][index].tags.indexOf(season_q) != -1 && season_q) {
                    searchData[property].push(jsonString[city][property][index]);
                  }
                });
              }
              else if ( jsonString[city][property][index].tags.indexOf(seasonCheck) != -1) {
                searchData[property].push(jsonString[city][property][index]);
              }
           });
         });
         console.log("YO");
         return callback(null, searchData);
      });
    }
  ], function(err, result) {
    console.log("SUCESS");
    if(err){
      console.log(err);
      res.render('city', {
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
      console.log("sdsdsdsdsdsdd");
      console.log(season);
      season = season.toLowerCase();
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
      let cityText = "";
      if (city == "newyorkcity") {
        cityText = "New York City"
      }
      return res.render('city', {
        city: city,
        date: date,
        data: result,
        listData: listData,
        filter : filterObj,
        season : season,
        cityText: cityText
      });
    }
  });

}


exports.save_to_list = function(req, res){
  console.log(req.params);
  listData.forEach((prop) => {
    if(prop.season === req.params.season){
      prop.count++;
      prop.list.push(req.params.name);
    }
  });
  console.log(listData);
}
