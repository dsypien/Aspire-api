var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');

var indexRoute = require('./routes/index');
var authenticateRoute = require('./routes/authenticate');
var registerRoute = require('./routes/register');
var loginRoute = require('./routes/login');

// Config
var port = process.env.PORT || 3003;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

//routes
app.use('/login', loginRoute);
app.use(authenticateRoute);// Authenticate all routes after this
app.use('/', indexRoute);
app.use('/register', registerRoute);


app.listen(port);
console.log('Server running on port ' + port);