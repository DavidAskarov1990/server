/**
 * Created by david on 23.05.17.
 */
var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());

router.use(require('./authorisation/index'));
router.use(require('./video/index'));
router.use(require('./admin/index'));

module.exports = router;