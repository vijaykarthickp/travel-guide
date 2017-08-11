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

exports.list = function(req, res){
  page_callback('list', req, res);
}

function page_callback(page, req, res){
  let city = req.params.city === 'nyc' ? 'newyorkcity' : req.params.city;
  let date = req.params.date;
  let processedData = {};
  let season = 'summer';

  city = (city == '' || typeof city == "undefined") ? 'newyorkcity' : city;

     async.waterfall([
    //Search for processed data
    function(callback){
      const data = process.cwd() + '/data.json';

      jsonFile.readFile(data, function(err, jsonString) {
        if(err)
          callback(err);
         let searchData = new Array();
         for(const property in jsonString[city]) {
           searchData[property] = new Array();
           
           for(index in jsonString[city][property]) {
            //console.log(jsonString[city][property][index]);
            /*if (typeof jsonString[city][property][index].tags == "undefined") {
               searchData[property].push(jsonString[city][property][index]);
             }
             else if ( jsonString[city][property][index].tags.indexOf(season) != -1) {
               searchData[property].push(jsonString[city][property][index]);
             }*/
             searchData[property].push(jsonString[city][property][index]);
           }
         }
         return callback(null, searchData);
      });
    }
  ], function(err, result) {
    if(err){
      console.log(err);
      return res.render(page, {
        date: err
      });
    }else{
             // console.log('result');
      return res.render(page, {
        data: result
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
      filters = query.filters;
      let filterObj = {};
      if (typeof filters !="undefined" || filters!="") {

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
      console.log(result);
      return res.render('city', {
        city: city,
        date: date,
        data: result,
        listData: listData,
        filter : filterObj

      });
    }
  });

}


exports.save_to_list = function(req, res){

}
