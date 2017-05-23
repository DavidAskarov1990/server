/**
 * Created by david on 14.05.17.
 */
var config = require('../../../config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(config.db_url, function(){
    console.log('MongoDB connected sucessfully')
});