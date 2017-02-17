var express = require('express');
var app = express();
// use middleware
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(express.cookieParser('your secret here'));
app.use(express.session({secret: "hello"}));

// local requires
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');
var register = require('./routes/register');
var messages = require('./lib/messages');
var login = require('./routes/login');
var entries = require('./routes/entries');
var user = require('./lib/middleware/user');
var validate = require('./lib/middleware/validate');
var api = require('./routes/api');

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/api', api.auth);
app.use(user);
app.use(messages);

// posts
app.get('/post', entries.form);
app.post('/post',
          validate.required('entry[title]'),
          validate.lengthAbove('entry[title]', 4),
          entries.submit);

// registration
app.get('/register', register.form);
app.post('/register', register.submit);

// login
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/:page?', page(Entry.count, 5), entries.list);

// API routes
app.get('/api/user/:id', api.user);

app.listen(3000);
console.log('Express running on port 3000');
