'use strict';

var router = require('express').Router();

router.post('/seed', function(){

  User.findOneAndRemove({email: 'admin@admin.com'});

  var newUser = new User({ name: 'Admin', email: 'admin@admin.com', password: 'admin' });
  newUser.provider = 'local';
  newUser.role = 'admin';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
  });

  newUser = new User({ name: 'Admin', email: 'manager@manager.com', password: 'manager' });
  newUser.provider = 'local';
  newUser.role = 'manager';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
});

module.exports = router;
