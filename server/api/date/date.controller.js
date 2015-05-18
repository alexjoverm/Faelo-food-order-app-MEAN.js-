'use strict';

var _ = require('lodash');
var DateModel = require('./date.model');

// Get list of dates
exports.index = function(req, res) {
  DateModel.find(function (err, dates) {
    if(err) { return handleError(res, err); }
    return res.json(200, dates);
  });
};

// Get a single date
exports.show = function(req, res) {

  console.log('-------- LLAMADO SHOW')

  DateModel.findById(req.params.id, function (err, date) {
    if(err) { return handleError(res, err); }
    if(!date) { return res.send(404); }
    return res.json(date);
  });
};

// Creates a new date in the DB.
exports.create = function(req, res) {

  console.log('-------- LLAMADO CREATE')

  DateModel.create(req.body, function(err, date) {
    if(err) { return handleError(res, err); }
    return res.json(201, date);
  });
};

// Updates an existing date in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  DateModel.findById(req.params.id, function (err, date) {
    if (err) { return handleError(res, err); }
    if(!date) { return res.send(404); }
    var updated = _.merge(date, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, date);
    });
  });
};

// Deletes a date from the DB.
exports.destroy = function(req, res) {

  console.log('-------- LLAMADO DESTROY')

  DateModel.findById(req.params.id, function (err, date) {
    if(err) { return handleError(res, err); }
    if(!date) { return res.send(404); }
    date.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};



// Get next 5 days
exports.getWeek = function(req, res) {

  console.log('-------- LLAMADO WEEK');
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var inFiveDays = new Date(today.getTime());
  inFiveDays.setDate(inFiveDays.getDate() + 5);


  DateModel.find().where('date').gte(today).lt(inFiveDays)
    .populate('_article').exec(function(err, dates){
      if(err) { return handleError(res, err); }
      return res.json(200, dates);
  });
};

// Get last month, current month, next month and one after the next
exports.getMonth = function(req, res) {
  var now = new Date();
  var firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  var lastDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 3, 0);


  DateModel.find().where('date').gte(firstDayLastMonth).lte(lastDayNextMonth)
    .populate('_article').exec(function(err, dates){
      if(err) { return handleError(res, err); }
      return res.json(200, dates);
    });
};



// Post in the whole month (req.body = {date, article})
exports.postMonth = function(req, res) {
  var aux = new Date(req.body.date); // ISO string date to date
  var date = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate());
  var dates = getDaysOfMonth(date);

  // build array to insert
  var arrayObj = [];
  for(var i in dates)
    arrayObj.push({date: dates[i], _article: req.body._article});

  // insert array
  DateModel.create(arrayObj, function(err, dates) {
    if(err) { return handleError(res, err); }
    var result = [];
    for (var i = 1; i < arguments.length; i++)
      result.push(arguments[i]);

    return res.json(200, result);
  });
};


// Post X times (req.body = {date, article})
//exports.postTimes = function(req, res) {
//  var aux = new Date(req.body.date); // ISO string date to date
//  var date = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate());
//  var arrayObj = [];
//
//  var times = parseInt(req.params.times);
//
//  if(!isNaN(times) && times < 12){
//
//    for(var i=0; i < req.params.times; i++)
//      arrayObj.push(
//        { date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 * i)),
//          _article: req.body._article }
//      );
//
//
//    // insert array
//    DateModel.create(arrayObj, function(err, dates) {
//      if(err) { return handleError(res, err); }
//      var result = [];
//      for (var i = 1; i < arguments.length; i++)
//        result.push(arguments[i]);
//
//      return res.json(200, result);
//    });
//
//  }
//  else{
//    res.send(400, 'You only can use a number lower than 12 times');
//  }
//};




// probar borrar con arrays

exports.deleteMonth = function(req, res) {

  var aux = new Date(req.params.date); // ISO string date to date


  var date = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate());
  var dates = getDaysOfMonth(date);

  var arrayObj = [];
  for(var i in dates)
    arrayObj.push(dates[i]);

  DateModel.find().where('date').in(arrayObj).remove(function(err, many) {
    if(err) { return handleError(res, err); }
    return res.send(204, many + ' elements removed');
  });
};

exports.deleteOne = function(req, res) {

  var aux = new Date(req.params.date); // ISO string date to date
  var date = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate());

  DateModel.find({date: date}).remove(function(err, many) {
    if(err) { return handleError(res, err); }
    return res.send(204, many + ' elements removed');
  });
};

//exports.deleteFrom = function(req, res) {
//
//  var aux = new Date(req.params.date); // ISO string date to date
//
//  var date = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate());
//  var dates = [];
//
//  for(var i=0; i < 20; i++)
//    dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 * i)));
//
//  var arrayObj = [];
//  for(var i in dates)
//    arrayObj.push(dates[i]);
//
//  DateModel.find().where('date').in(arrayObj).remove(function(err, many) {
//    if(err) { return handleError(res, err); }
//    return res.send(204, many + ' elements removed');
//  });
//};







function handleError(res, err) {
  return res.send(500, err);
}


function getDaysOfMonth(date) {
  var dateCopy = new Date(date.getTime());
  dateCopy.setDate(dateCopy.getDate() - 7);

  var month = date.getMonth();
  var result = [];

  // Get all the other Mondays in the month
  while (date.getMonth() === month) {
    result.push(new Date(date.getTime()));
    date.setDate(date.getDate() + 7);
  }

  while (dateCopy.getMonth() === month) {
    result.push(new Date(dateCopy.getTime()));
    dateCopy.setDate(dateCopy.getDate() - 7);
  }

  return result;
}

function getDaysOfMonthForward(date) {

  var month = date.getMonth();
  var result = [];

  // Get all the other Mondays in the month
  while (date.getMonth() === month) {
    result.push(new Date(date.getTime()));
    date.setDate(date.getDate() + 7);
  }

  return result;
}
