let express = require('express');
let router = express.Router();
const nodemailer = require('nodemailer');
import staticConfig from './mailconfig'

export default (userData) => {
 var transporter = nodemailer.createTransport({
   service:staticConfig.mail.messageNodemailService,
   auth:{
     user:staticConfig.mail.messageNodemailAuthEmail,
     pass:staticConfig.mail.messageNodemailAuthPassword
   }
 });

 var mailOptions = {
   from:staticConfig.mail.messageNodemailOptionEmail, // sender address
   to: userData.email,
   // list of receivers
   subject:staticConfig.mail.messageNodemailOptionSubject, // Subject line            
   html:staticConfig.mail.mailstart+userData.name+staticConfig.mail.mailmiddle+userData._id+staticConfig.mail.mailend
 };
 transporter.sendMail(mailOptions, function(error, info){
   if(error){
     return false;
   }
   else {
     return true;
   }
 });
}