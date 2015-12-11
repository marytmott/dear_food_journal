var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
// bcrypt value of secret?
var secret = 'secret pw'; // for dev only, production will be process.env + hash it??
// check for same user
function checkTokenUser(req, res, next) {
  try {
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], secret);
    console.log('======decoded', decoded);
    if (req.params.user_id === decoded.id) {
      return next();
    } else {
      res.status(401).send('Not authorized');
    }
  } catch(err) {
    console.log(err);
    res.status(500).send('nope!');
  }
}

// do not need this function?
// check token, will indicate they are logged in
function checkToken(req, res, next) {
  try {
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], secret);
    next();
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
}

// test token from server:
// {
  // "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2NjhiNzc1ODgxOGU2ZDU1MmIzMzdhMyIsImlhdCI6MTQ0OTcwNDU2M30.eEEASY0inbi5SGCDcwZuSf-8InU__bn6NPS3ZfhRh-Y",
//   "user": {
//     "id": "5668b7758818e6d552b337a3",
//     "firstName": null
//   }
// }

// happy user: 5667d008331b9d69471144d0


// signup (create user)
router.post('/signup', function(req, res) {
  db.User.create(req.body, function(err, user) {
    var responseItems;
    var token;

    if (err) {
      console.log(err);
      return res.status(400).send(err);
      // send back errors?
    }
    // add expiresIn to token?
    // DRY this up w/ login!
    responseItems = { id: user._id, firstName: user.firstName || null }
    token = jwt.sign({ id: user._id }, secret);
    res.json({ token: token, user: responseItems });
  });
});

// do not need logout route b/ angular will remove token on logout

// login user
router.post('/login', function(req, res) {
  console.log(req.body);
  db.User.authenticate(req.body, function(err, user) {
    var responseItems;
    var token;

    if (err || !user) {
      return res.status(400).send(err);
    }
    responseItems = { id: user._id, firstName: user.firstName || null }
    token = jwt.sign({ id: user._id }, secret);
    res.json({ token: token, user: responseItems });
  });
});

// show
router.get('/:user_id', checkTokenUser, function(req, res) {
  db.User.findById(req.params.user_id, function(err, user) {
    // var userItems = { user}
    if (err) {
      console.log(err);
      res.send(500).send(err);
    } else if (!user) {
      res.status(401).send(err);
    } else {
      res.send('user info to put here');
    }
  });
});

// edit
router.put('/:user_id', checkTokenUser, function(req, res) {

  // if user changes password, change token?
  // db.User.findById(req.body.user_id, )
});

//delete
router.delete('/:user_id', checkTokenUser, function(req, res) {

});

module.exports = router;