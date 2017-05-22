/**
 * Created by david on 14.05.17.
 */
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../model/user');
var config = require('../../config');

router.get('/user', function (req, res) {
    if(!req.cookies.token){
        return res.sendStatus(401);
    }
    try{
        var auth = jwt.decode(req.cookies.token, config.secretKey);
    } catch(err) {
        return res.sendStatus(401)
    }
    User.findOne({username: auth.username}, function (err, user) {
        if(err){
            return res.sendStatus(500);
        }else{
            res.json(user);
        }
    })
});

router.post('/user', function (req, res) {
    var user = new User;
    user.username = req.body.username;
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if(err){
            res.sendStatus(500);
        } else{
            user.password = hash;
            user.save(function (err) {
                if(err){
                    res.sendStatus(500);
                }
                res.sendStatus(201);
            })
        }
    })
});

router.get('/admin', function (req, res) {
    if(!req.cookies.token){
        return res.sendStatus(401);
    }
    try{
        var auth = jwt.decode(req.cookies.token, config.secretKey);
    } catch(err) {
        return res.sendStatus(401)
    }
    User.findOne({username: auth.username}, function (err, user) {
        if(err){
            return res.sendStatus(500);
        }else{
            if(user.admin){
                res.json(true);
            } else{
                res.json(false);
            }
        }
    })
});


module.exports = router;
