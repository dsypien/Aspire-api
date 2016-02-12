var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');

var indexRoute = require('./routes/index');
var registerRoute = require('./routes/register');

// Config
var port = process.env.PORT || 3003;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

//routes
app.use('/', indexRoute);
app.use('/register', registerRoute);

app.listen(port);
console.log('Server running on port ' + port);