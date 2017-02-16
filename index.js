var express = require('express');

var register = require('./routes/register');

var app = express();

app.get('/', function(req, res) {
  res.send('Hello world!');
});

// registration
app.get('/register', register.form);
app.post('/register', register.submit);

app.listen(3000);
