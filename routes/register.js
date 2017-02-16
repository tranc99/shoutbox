var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('register', { title: 'Register' });
};
