let mongoose = require('mongoose');
import bcrypt from 'bcrypt-nodejs';
mongoose.set('debug',true);
let Schema=mongoose.Schema;

let register=new Schema({
 name:String,
 username:{type:String},
 contact_no:{type:Number},
 email:{type:String, unique:true},
 password:String,
 status:Boolean,
 type:String,
 badCount : {type:Number , default:0},
 questions : []
},{collection:'registereduser',versionKey: false});

register.pre('save', function (next) {  
 let user = this;
 if (this.isModified('password') || this.isNew) {
   bcrypt.genSalt(10, function (err, salt) {
     if (err) {
       return next(err);
     }
     bcrypt.hash(user.password, salt,null, function(err, hash) {
       if (err) {
         return next(err);
       }
       user.password = hash;
       next();
     });
   });
 } else {
   return next();
 }
});



let register_model= mongoose.model('registereduser',register);

module.exports =  register_model;