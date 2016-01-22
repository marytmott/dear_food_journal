var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var db = require('./index');
var Journal = require('./journal');

// TODO: pre/post hooks

var userSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  firstName: {
    type: String
  },
  journal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }]
});

// pre-save hook checking/encryping pw
userSchema.pre('save', function(next) {
  var user = this;

  // skip encrypt if pw is not new or modified
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // define pw for user
      user.password = hash;
      return next();
    })
  });
});

// class method (statics) - User.something
userSchema.statics.authenticate = function(formData, callback) {
  // 'this' refers to the model
  this.findOne({email: formData.email}, function(err, user) {
    if (user === null) {
      callback('Invalid username or password', null);
    } else {
      user.checkPassword(formData.password, callback);
    }
  });
};


// instance method (methods) - var someone = new User.method()
userSchema.methods.checkPassword = function(password, callback) {
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (isMatch) {
      callback(null, user);
    } else {
      callback(err, null);
    }
  });
};

// TODO: add post delete hook to remove all their stuff
// call delete journal separately to delete entries?

var User = mongoose.model('User', userSchema);

module.exports = User;