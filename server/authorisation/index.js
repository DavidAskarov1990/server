/**
 * Created by david on 14.05.17.
 */

var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());

router.use(require('./user'));
router.use(require('./login'));

module.exports = router;