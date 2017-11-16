import data from './../../model/register_schema';
import staticConfig from './Config' ;   //file for error messages
import passport from 'passport';
import logger from './../../log4js';
import config from './../../config/config';

const nodemailer = require('nodemailer');

module.exports= ('/',(req, res) => {
  try{

    let transporter = nodemailer.createTransport({
      service: staticConfig.forgotpassword.MessageNodemailService,
      auth:{
        user:staticConfig.forgotpassword.MessageNodemailAuthEmail,//sender address
        pass: staticConfig.forgotpassword.MessageNodemailAuthPassword//sender password 
      }
    });
    let mailOptions={};

    data.find({"email" : req.body.email}, (err,data1) => {
      
      if(data1.length==0){//email not registered
        logger.info(staticConfig.forgotpassword.MessageErrorNotFind)
        res.json({status:false, message:staticConfig.forgotpassword.MessageErrorNotFind})
      }
      else {
        data.update({"email": req.body.email}, {$set:{
          "status":false}},(err1,data2) => {
            
            if(err1){ // error in update
              logger.info(staticConfig.forgotpassword.MessageErrorNotUpdate)
              res.json({status:false, message:staticConfig.forgotpassword.MessageErrorNotUpdate});
            }
            else if(data2 == undefined) {
              logger.info(staticConfig.forgotpassword.MessageErrorNotUpdate)
              res.json({status:false, message:staticConfig.forgotpassword.MessageErrorNotUpdate});  
            }
            else {
              
              mailOptions = {
                from: staticConfig.forgotpassword.MessageNodemailOptionEmail,// sender address
                to: data1[0].email,// list of receivers
                subject: staticConfig.forgotpassword.MessageNodemailOptionSubject,// Subject line
                html:staticConfig.forgotpassword.startmail+data1[0].name+staticConfig.forgotpassword.middlemail+config.clientRedirectUrl+
                staticConfig.forgotpassword.middlemail2+data1[0].username+`/`+data1[0]._id+staticConfig.forgotpassword.endmail
              }
              let a;
              transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  logger.info(staticConfig.forgotpassword.MessageErrorMailNotSent)
                  res.json({status:false, message:staticConfig.forgotpassword.MessageErrorMailNotSent});
                }else{
                  logger.info(staticConfig.forgotpassword.MessageSuccessMailSent)
                  res.json({status:true,message:staticConfig.forgotpassword.MessageSuccessMailSent,info:info});
                }
              })
              //res.json({status:true,message:staticConfig.forgotpassword.MessageSuccessMailSent});
            }
          });
      };
    });
  }catch(error){ //error handle
    logger.info(staticConfig.errorMessage.val)
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});
  }      
});