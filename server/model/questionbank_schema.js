let mongoose = require('mongoose');
mongoose.set('debug',true);
let Schema=mongoose.Schema;

let question=new Schema({
questions : []
},{collection:'unansweredQuestion',versionKey: false});

let register_model= mongoose.model('unansweredQuestion',question);

module.exports =  register_model;