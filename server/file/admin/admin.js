/**
 * Created by david on 22.05.17.
 */
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../../config');
var fs = require('fs');
var _ = require('lodash');

router.get('/users', function (req, res) {
    fs.readFile('server/file/users.json', 'utf8', function (err, data) {
        if (err){
            return res.sendStatus(500);
        };
        var users = JSON.parse(data);
        _.remove(users, function (user) {
            return user.admin == true;
        })

        return res.send(users)
    });
});

router.post('/ban', function (req, res) {
    fs.readFile('server/file/users.json', 'utf8', function (err, data) {
        if (err){
            return res.sendStatus(500);
        };
        var users = JSON.parse(data);
        _.forEach(users, function (user) {
            if(user._id == req.body.id_user){
                user.ban = req.body.ban;
            }
        })
        fs.writeFile('server/file/users.json', JSON.stringify(users), function (err) {
            if(err){
                return res.sendStatus(500);
            }
            return res.sendStatus(201);
        })
    });
});

module.exports = router;
