var express = require('express');
var User = require('../lib/user');

exports.auth = express.basicAuth(User.authenticate);
