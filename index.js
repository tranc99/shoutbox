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
var register = require('./routes/register');
var messages = require('./lib/messages');
var login = require('./routes/login');
var entries = require('./routes/entries');
var user = require('./lib/middleware/user');


app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(user);
app.use(messages);

app.get('/', entries.list);

// registration
app.get('/register', register.form);
app.post('/register', register.submit);

// login
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.listen(3000);
console.log('Express running on port 3000');
