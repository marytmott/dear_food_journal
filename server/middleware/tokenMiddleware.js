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

module.exports = {
  checkTokenUser: checkTokenUser,
  checkToken: checkToken
};