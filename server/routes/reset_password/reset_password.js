import express from 'express';
import data from '../../model/register_schema';
import staticConfig from './Config';
import logger from '../../log4js';
import comparePassword from './../../util/comparePassword';
import bcrypt from 'bcrypt';
export default (req,res)=>{
  try{
    //find username
    data.find({"email" : req.params.email}, (err,data1) => {
      if(err){
        res.json({message :staticConfig.errorMessage,status:false})
      }
      else if(data1 == undefined) {
        res.json({message : staticConfig.reset_password.UserNotFindMessage,status:false})
      }
      else {
        comparePassword(req.body.oldpassword, data1[0].password, (err, isMatch)=>{
          if(isMatch) {
            let password = req.body.newpassword;
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt)
            data.update({"email":req.params.email}, {$set:{
              "password":hash}},{upsert:true},(err,data2)=>{
                        if(err){                            //to check error in upadation of password
                          res.json({status:false, message : staticConfig.reset_password.UpdatePasswordError})
                        }
                        
                        else if(data2==undefined){
                         res.json({data2:undefined,message:staticConfig.reset_password.undefined})
                       }
                       else{            

                //password is successfully updated
                res.json({status:true,message : staticConfig.reset_password.successMessage, data:data2});
              }
            })
          }
          else {                            
            //old password not matched error
            res.json({message : staticConfig.reset_password.OldPasswordNotMatch, status:false})
          }
        })
            //checking equality of old and new password
          }
        })
  }catch(error){
    res.json({status:false, message:staticConfig.errorMessage,data:error});
  } 
};