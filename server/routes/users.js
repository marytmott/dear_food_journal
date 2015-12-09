var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secret = 'secret pw'; // for dev only, production will be process.env
var token;



// signup (create)
router.post('/signup', function(req, res) {
  console.log(req.body);
  db.User.create(req.body, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      // send back errors?
    } else {
      res.status(200).send(user);
      // log user in
      // create web token
      // send back status?
    }
  });
});

// login
router.post('/login', function(req, res) {
  db.User.authenticate(req.body, function(err, user) {
    if (err) {
      return
    }
  })
});

// logout
router.post('/logout', function(req, res) {

});

// show
router.get('/:id', function(req, res) {
  db.User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.send(user);
    }
  });
});

// edit
router.put('/:id', function(req, res) {
  // db.User.findById(req.body.id, )
});

//delete
router.delete('/:id', function(req, res) {

});


module.exports = router;