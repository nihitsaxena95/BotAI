let mongoose = require('mongoose');
mongoose.set('debug',true);
let Schema=mongoose.Schema;

let question=new Schema({
task : String,
question : [],
result : String
},{collection:'flow',versionKey: false});

let register_model= mongoose.model('flow',question);

module.exports =  register_model;