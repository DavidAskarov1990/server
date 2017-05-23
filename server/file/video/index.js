/**
 * Created by david on 22.05.17.
 */
var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());
router.use(require('./videos'));

module.exports = router;
