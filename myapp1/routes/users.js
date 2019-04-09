var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user.model');

var router = express.Router();

router.post('/signup', function(req, res) {
  if(!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Pleace pass username and password'});
  } else {
    var newUser = new User(req.body);

    newUser.save(function(err) {
      if(err) {
        return res.json({success: true, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if(err) throw true;
    
    if(!user) {
      return res.status(401).send({success: false, msg: 'Authentication failed. User not found'});
    }

    user.comparePassword(req.body.password, function(err, isMatch) {
      if(isMatch && !err) {
        var token = jwt.sign(user.toObject(), 'secret-word', {expiresIn: 'id'});
        return res.status(200).json({success: true, token: 'JWT' + token});
      }
      res.status(401).send({success: false, msg: 'Authentafication failed. Wrong password.'});
    })
  })
})


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
