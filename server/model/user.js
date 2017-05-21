var mongoose = require('./db');

const User = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true, select:false},
    youtubeLinks:{type:Array, default:'rsqrogmfP7M'},
    admin:{type: Boolean, default:false}
});

module.exports = mongoose.model('User', User);