/**
 * Created by david on 21.05.17.
 */

var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../../config');
var User = require('../model/user');

router.get('/users', function (req, res) {
    User.find({}).where('admin').equals(false).exec(function (err, users) {
        if(err){
            return res.sendStatus(500)
        }
        return res.send(users)
    });
});

router.post('/ban', function (req, res) {
    User.findByIdAndUpdate(req.body.id_user, {$set : {ban: req.body.ban}}, {new: true}, function (err, user) {
        if(err){
            return res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    })
});

module.exports = router;
