/*================Signup===========*/
let express = require('express');
  let router = express.Router();
  let RegisterUser = require('../../model/register_schema');
  import logger from '../../log4js';
  const nodemailer = require('nodemailer');
  let staticConfig = require('./Config');
  import mailSent from '../../util/mail';
 
  export default (req, res, next)=> {

     
  RegisterUser.findOne({"email" :req.body.email },(err,data)=>{
    if(err){
      logger.info(staticConfig.signup.messageNotFound);  // making logs
      res.json({status:false,message:staticConfig.signup.messageNotFound,userdata:null});   //response to client
    }
    else{
      

        if(data){
          logger.info(staticConfig.signup.messageAlreadyExist);  // making logs
           res.json({status:false, message:staticConfig.signup.messageAlreadyExist});  //response to client
          

        }
        else{
         
            let registerUser = new RegisterUser({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            type : "User",
            status : false

            })
      
            registerUser.save((err, user)=>{
               if(err) {
            logger.info(staticConfig.signup.messageNotFound)      // making logs
                res.json({status:false, message : error});      //response to client
              }
               else {
               let emailStaus = mailSent(user);
               if(emailStaus)
               {
                logger.info(staticConfig.signup.messageSuccessFind);  // making logs
                 res.json({status:true, message : staticConfig.signup.messageSuccessFind});   //response to client
               }
               else
               {
                logger.info(staticConfig.signup.messageNodemailErrorEmail);  // making logs
                 res.json({status:true, message : staticConfig.signup.messageNodemailErrorEmail});      //response to client
               }

              }
    
              })
          }
    }
  })
}
