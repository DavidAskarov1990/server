/**
 * Created by david on 21.05.17.
 */

var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');
var User = require('../model/user');

router.get('/users', function (req, res) {
    User.find({}).where('admin').equals(false).exec(function (err, users) {
        if(err){
            return res.sendStatus(500)
        }
        return res.send(users)
    });
});

router.get('/ban', function (req, res) {
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
            var query = {'username':req.user.username};

            // user.bun = !user.bun;
            // console.log('user.bun ', user.bun)
            // user.save(function (err, updatedTank) {
            //     if (err) return res.sendStatus(500);
            //     return res.sendStatus(200);
            // });
        }
    })
});

module.exports = router;
