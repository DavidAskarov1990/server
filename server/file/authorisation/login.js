/**
 * Created by david on 22.05.17.
 */
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var _ = require('lodash');
var fs = require('fs');
var config = require('../../../config');

router.post('/login', function (req, res) {
    if(!req.body.username || !req.body.password){
        return res.sendStatus(400);
    } else {
        var username = req.body.username;
        var password = req.body.password;
        fs.readFile('server/file/users.json', 'utf8', function (err, data) {
            if (err){
                return res.sendStatus(500);
            };
            var collection = JSON.parse(data);

            var user = _.find(collection, function (user) {
                return user.username == username;
            });

            if(!user){
                return  res.sendStatus(400);
            } else {
                bcrypt.compare(password, user.password, function (err, valid) {
                    if(err){
                        return res.sendStatus(500);
                    } else if(!valid){
                        return res.sendStatus(401);
                    }
                    var token = jwt.encode({username:username}, config.secretKey);
                    res.cookie('token', token);
                    return res.send(token);
                })
            }
        });
    }
});

module.exports = router;
