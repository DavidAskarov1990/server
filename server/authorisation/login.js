/**
 * Created by david on 14.05.17.
 */
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');
var User = require('../model/user');

router.post('/login', function (req, res) {
    if(!req.body.username || !req.body.password){
        return res.sendStatus(400);
    } else {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({username: username})
            .select('password')
            .exec(function (err, user) {
                if(err){
                    return  res.sendStatus(500);
                } else if(!user){
                    return res.sendStatus(401);
                }
                bcrypt.compare(password, user.password, function (err, valid) {
                    if(err){
                        return res.sendStatus(500);
                    } else if(!valid){
                        return res.sendStatus(401);
                    }
                    var token = jwt.encode({username:username}, config.secretKey);
                    res.cookie('token', token);
                    res.send(token);
                })
            })
    }
});

module.exports = router;
