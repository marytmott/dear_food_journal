var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secret = process.env.DFJ_JWT; // bcrypt value of secret?

// check for same user
function checkTokenUser(req, res, next) {
  try {
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], secret);

    if (req.params.user_id === decoded.id) {
      return next();
    } else {
      res.status(401).send('Not authorized');
    }
  } catch(err) {
    // TODO - error handling
    console.log(err);
    res.status(500).send('Error.');
  }
}

// check token, will indicate if they are logged in
function checkToken(req, res, next) {
  try {
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], secret);
    next();
  } catch(err) {
    // TODO - error handling
    console.log(err);
    res.status(500).send(err);
  }
}

// signup (create user)
router.post('/signup', function(req, res) {
  db.User.create(req.body, function(err, user) {
    var responseItems;
    var token;

    if (err) {
      // TODO - error handling
      console.log(err.message);
      return res.status(400).send(err.message);
      // error E11000 = duplicate key
    }
    // create new journal for user
    db.Journal.create({}, function(err, journal) {
      if (err) {
        // TODO - error handling
        console.log(err);
        return res.status(500).send(err);
      }
      journal.user.push(user._id);
      journal.save();
      user.journal.push(journal._id);
      user.save();

      // TODO - add expiresIn to token
      // DRY this up w/ login!
      responseItems = { id: user._id, firstName: user.firstName || null, journal: journal.id };
      token = jwt.sign({ id: user._id }, secret);
      res.json({ token: token, user: responseItems });
    });
  });
});

// login user
router.post('/login', function(req, res) {
  db.User.authenticate(req.body, function(err, user) {
    var responseItems;
    var token;

    if (err || !user) {
      // TODO - error handling
      return res.status(400).send(err);
    }
    // need to get journal info for token
    db.Journal.findOne({ user: user._id }, function(err, journal) {
      if (err) {
        // TODO - error handling
        console.log(err);
        return res.status(500).send(err);
      }
      responseItems = { id: user._id, firstName: user.firstName || null, journal: journal.id };
      token = jwt.sign({ id: user._id }, secret);
      res.json({ token: token, user: responseItems });
    });
  });
});

// do not need logout route b/ angular will remove token on logout

// show user
router.get('/:user_id', checkTokenUser, function(req, res) {
  db.User.findById(req.params.user_id, function(err, user) {
    // TODO - error handling
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

// TODO - finish user CRUD

// edit user
router.put('/:user_id', checkTokenUser, function(req, res) {
  // will need new token on this route
  // if user changes password, change token?
});

// delete user
router.delete('/:user_id', checkTokenUser, function(req, res) {

});

module.exports = router;