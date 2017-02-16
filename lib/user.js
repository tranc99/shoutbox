var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();

module.exports = User;

function User(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
}

User.prototype.save = function(fn) {
  if (this.id) {
    this.update(fn);
  } else {
    var user = this;
    db.incr('user:ids', function(err, id) {
      if (err) return fn(err);
      user.id = id;
      user.hashPassword(function(err) {
        if (err) return fn(err);
        user.update(fn);
      });
    });
  }
}
