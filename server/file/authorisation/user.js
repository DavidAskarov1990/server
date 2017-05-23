/**
 * Created by david on 22.05.17.
 */
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../../config');
var fs = require('fs');
var _ = require('lodash');
var tempalateUser = require('../templateUser');
var isAuthorization = require('../../isAuthorization/index');

router.get('/user', isAuthorization, function (req, res) {
    try{
        var auth = jwt.decode(req.cookies.token, config.secretKey);
    } catch(err) {
        return res.sendStatus(401)
    }

    fs.readFile('server/file/users.json', 'utf8', function (err, data) {
        if (err){
            return res.sendStatus(500);
        };
        var collection = JSON.parse(data);
        var user = _.find(collection, function (u) {
            return u.username ==  auth.username;
        });
        if(!user){
            return  res.sendStatus(400);
        }
        delete user.password;
        return res.json(user)
    })
});

router.post('/user', function (req, res) {
    fs.readFile('server/file/users.json', 'utf8', function (err, data) {
        if (err){
            return res.sendStatus(500);
        };
        var array = JSON.parse(data);
        tempalateUser.username = req.body.username;
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if(err){
                res.sendStatus(500);
            } else {
                tempalateUser.id = Date.now();
                tempalateUser.password = hash;

                array.push(tempalateUser);
                fs.writeFile('server/file/users.json', JSON.stringify(array), function (err) {
                    if(err){
                        return res.sendStatus(500);
                    }
                    return res.sendStatus(201);
                })
            }
        })
    })
});

router.get('/admin', isAuthorization, function (req, res) {
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
        var user = _.find(array, function (item) {
            return item.username == auth.username;
        })
        if(!user){
            return res.sendStatus(401);
        }

        if(user.admin){
            res.json(true);
        } else{
            res.json(false);
        }
    });
});

module.exports = router;
