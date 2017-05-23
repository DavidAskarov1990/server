/**
 * Created by david on 21.05.17.
 */

var router = require('express').Router();
var jsonFile = require('./videos.json');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../../config');
var User = require('../model/user');
var _ = require('lodash');
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
    User.findOne({username: auth.username}, function (err, user) {
        if(err){
            return res.sendStatus(500);
        }
        else if(!user){
            return res.sendStatus(401)
        }
        else if(_.find(user.youtubeLinks, function(link)
            {
                return link.id == req.body.id
            }))
        {
            return res.sendStatus(304)
        }
        User.update({_id: user._id}, {$push: {"youtubeLinks":req.body}}, function (err) {
            if(err){
                return res.sendStatus(500);
            }
            return res.sendStatus(202);
        })
    })
});


module.exports = router;
