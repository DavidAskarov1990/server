/**
 * Created by david on 21.05.17.
 */
var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(require('./videos'));

module.exports = router;