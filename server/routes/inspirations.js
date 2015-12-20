var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');

router.post('/', function(req, res) {
  console.log(req.body);
  db.Inspiration.create(req.body, function(err, inspiration) {
    if (err) {
      console.log(err);
    } else {
      console.log(inspiration);
      res.json({ success: true });
    }
  });

  // res.json({ message: 'received' });
});

module.exports = router;
