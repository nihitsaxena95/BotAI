import register from '../../model/register_schema';
import staticConfig from './Config';
import express from 'express';
import logger from '../../log4js';

//Get method is used to check id exists

module.exports = (req, res) => {
  try{
    register.find({_id:req.params.id},(err,check)=>{
      if(err){
        logger.info(staticConfig.warning_page.messageOnIdNotFound)
        res.json({message : staticConfig.warning_page.messageOnIdNotFound ,Error : err});
      //Id is not found
    }
    else if(check==undefined){
     logger.info(staticConfig.warning_page.messageOnVerificationUndefined)
     res.json({message:staticConfig.warning_page.messageOnVerificationUndefined,data:null});
   }
  //If id exists we are checing if status if it is false we are verifying and making status true
  else if(check[0].status==false){
      if(err)//checking for error
      {
        logger.info(staticConfig.warning_page.messageOnFailure)
        res.json({message : staticConfig.warning_page.messageOnFailure ,Error : err});
          //error message of failure
        }
        else
        {
          register.find({_id : req.params.id}, (err,data) => {
            //finding by object id to check if user status is true 
            logger.info(staticConfig.warning_page.messageOnVerificationSuccess)
            res.json({message: staticConfig.warning_page.messageOnVerificationSuccess ,"userdata" : data[0]});
          //when found send back the data as response
        })
        }       
      }
      else {
       logger.info(staticConfig.warning_page.messageOnVerificationFailure)
       res.json({message: staticConfig.warning_page.messageOnVerificationFailure ,"userdata":check});
        //if status is true 
      }
    })
  }catch(error){                      // error handle if suddenly error occur in database
    logger.info(staticConfig.errorMessage.val)
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});     //response to client
  }
};