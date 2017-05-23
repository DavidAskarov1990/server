/**
 * Created by david on 22.05.17.
 */
var router = require('express').Router();
var jsonFile = require('./videos.json');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../../config');
var _ = require('lodash');
var fs = require('fs');
var isAuthorization = require('../../isAuthorization');

router.get('/videos', isAuthorization, function (req, res) {
    res.json(jsonFile);
});

router.post('/video', isAuthorization, function (req, res) {
    if(!req.body.id || !req.body.title){
        return res.sendStatus(400)
    }
    try{
        var auth = jwt.decode(req.cookies.token, config.secretKey);
    } catch(err) {
        return res.sendStatus(401)
    }

    fs.readFile('server/file/users.json', 'utf8', function (err, data) {
        if (err){
            return res.sendStatus(500);
        };
        var array = JSON.parse(data);
        var user = _.find(array, function (u) {
            return u.username == auth.username;
        });

        if(!user){
            return res.sendStatus(401)
        } else if(_.find(user.youtubeLinks, function(link) {return link.id == req.body.id})){
                return res.sendStatus(304)
        } else {
            user.youtubeLinks.push(req.body);
            fs.writeFile('server/file/users.json', JSON.stringify(array), function (err) {
                if(err){
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);
            })
        }
    });
});

module.exports = router;
