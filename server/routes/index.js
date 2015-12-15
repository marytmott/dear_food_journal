var express = require('express');
var router = express.Router();
var path = require('path');

// route files
var users = require('./users');
var foods = require('./foods');

// only allow ajax calls
function checkHeaders(req, res, next) {
  // console.log(req.headers);
  // if header does not request with ajax, send to angular main site...?
  // this needs to be in all lowercase as how it is sent from front-end
  if (!req.headers['x-requested-with']) {
    res.sendFile(path.join(__dirname, '../../client', 'index.html'));
  } else {
    // call next route handler
    next();
  }
}

router.use(checkHeaders);

module.exports = {
  router: router,
  users: users,
  foods: foods
};