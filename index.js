var express = require('express');

var register = require('./routes/register');
var messages = require('./lib/messages');

var app = express();
// use middleware
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(messages);

app.get('/', function(req, res) {
  res.send('Hello world!');
});

// registration
app.get('/register', register.form);
app.post('/register', register.submit);

app.listen(3000);
