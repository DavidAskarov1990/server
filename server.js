/**
 * Created by david on 14.05.17.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');

var app = express();
var port = process.env.PORT || config.port;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type, application/json, Authorization, set-cookie, Accept, X-Requested-With');
    next();
});

app.use(require('./server/authorisation/index'));
app.use(require('./server/video/index'));

var server = app.listen(port, function() {
    console.log('Server up and running in %d ', server.address().port)
});