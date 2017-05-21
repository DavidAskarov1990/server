/**
 * Created by david on 21.05.17.
 */

var router = require('express').Router();
var jsonFile = require('./videos.json');

router.get('/videos', function (req, res) {
    if(!req.cookies.token){
        return res.sendStatus(401);
    }
    res.json(jsonFile);
});