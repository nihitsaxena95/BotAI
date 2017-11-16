let mongoose = require('mongoose');
mongoose.set('debug',true);
let Schema=mongoose.Schema;

let question=new Schema({
	taskname : String,
	data : []
},{collection:'tasks',versionKey: false});

let add_task= mongoose.model('tasks',question);

module.exports =  add_task;