/**
 * Created by david on 14.05.17.
 */
var bodyParser = require('body-parser');
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../model/user');

router.use(bodyParser.json());

/**
 * Create default admin
 *
 * login : admin
 * password : admin
 */
router.use(function (req, res, next) {
    User.findOne({admin: true}, function (err, user) {
        if(!user){
            var user = new User;
            user.username = 'admin';
            user.admin = true;
            bcrypt.hash('admin', 10, function (err, hash) {
                user.password = hash;
                user.save()
            })
        }
        next();
    });
});


router.use(require('./user'));
router.use(require('./login'));

module.exports = router;