var express = require('express');
var res = express.response;

res.message = function(msg, type) {
  type = type || 'info';
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  
}
