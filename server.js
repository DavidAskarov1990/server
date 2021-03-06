/**
 * Created by david on 14.05.17.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var fs = require('fs');

var app = express();
var port = process.env.PORT || config.port;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type,  X-Custom-Header, Authorization, set-cookie, Accept, X-Requested-With');
    next();
});

/**
 * With File DB
 */
app.use(require('./server/file/index'));

/**
 * With MongoDB
 */
// app.use(require('./server/mongo/index'));


var server = app.listen(port, function() {
    console.log('Server up and running in %d ', server.address().port)
});