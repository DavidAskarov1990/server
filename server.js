/**
 * Created by david on 14.05.17.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var request = require('request');
var config = require('./config');

var app = express();
var port = process.env.PORT || config.port;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'text/html', 'content-type, application/json, Authorization, set-cookie, Accept, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use('/', function (req, res) {
    var x = request('https://www.youtube.com/watch?v=haoTFLjysjk');
    req.pipe(x);
    x.pipe(res)
});

app.use(express.static('public'));
app.use(require('./server/authorisation/index'));

var server = app.listen(port, function() {
    console.log('Server up and running in %d ', server.address().port);
});