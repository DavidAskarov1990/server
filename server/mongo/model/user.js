var mongoose = require('./db');

const User = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true, select:false},
    youtubeLinks:{type:Array, default:{title:'Relax', id:'P5csD0SX8jI'}},
    admin:{type: Boolean, default:false},
    ban:{type:Boolean, default:false}
});

module.exports = mongoose.model('User', User);