/**
 * Created by david on 21.05.17.
 */
var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());
router.use(require('./admin'));

module.exports = router;