var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
  var url = req.originalUrl;
  var naturalDate;
  var unixDate;

  url = url.slice(1);
  if (isNaN(url)) {
    url = url.replace(/%20/g, " ");
    naturalDate = url;
    naturalDate = new Date(naturalDate);
  } else {
    unixDate = parseInt(url);
    naturalDate = new Date(unixDate*1000);
  }

  if(moment(naturalDate).isValid()){
    unixDate = Date.parse(naturalDate);
    naturalDate = moment(unixDate).format('MMMM Do YYYY');
  } else {
    unixDate = null;
  }

  var timeDate = {
    unix: unixDate,
    natural: naturalDate
  };

  res.send(timeDate);
});

module.exports = router;
