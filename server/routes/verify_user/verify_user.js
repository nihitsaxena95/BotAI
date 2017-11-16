import register from '../../model/register_schema';
import staticConfig from './Config';
import express from 'express';
import logger from '../../log4js';

//Get method is used to check id exists
export default(req, res) => {
  try{
    register.find({_id:req.params.id},(err,check)=>{

      if(err){                      //If error found
      logger.info(staticConfig.verify_user.messageOnIdNotFound);               // Log file        
      res.json({message : staticConfig.verify_user.messageOnIdNotFound ,Error : err});    //response to client
    }
    else if(check==undefined){                  //If data is undefined
      logger.info(staticConfig.verify_user.messageonDataUndefined);           // Log file 
     res.json({message: staticConfig.verify_user.messageonDataUndefined,data:null});
   }
        //If id exists we are checking if status is false, we verify and make status true
        else if(check[0].status==false){
          register.update({_id:req.params.id},{$set:{"status":true}},{upsert:true},(err,data)=>{
            if(err)
            {
             logger.info(staticConfig.verify_user.messageOnUpdateFailure);        // Log file 
             res.json({message : staticConfig.verify_user.messageOnUpdateFailure ,Error : err});
           }
           else if(data==undefined){                      //When data returned is undefined
            logger.info(staticConfig.verify_user.messageOnVerificationUndefined);       // Log file 
            res.json({message:staticConfig.verify_user.messageOnVerificationUndefined,data:null});
          }
          else
          {                                             //If data is returned
           register.find({_id : req.params.id}, (err,data) => {
            logger.info(staticConfig.verify_user.messageOnVerificationSuccess);             // Log file 
            res.json({message: staticConfig.verify_user.messageOnVerificationSuccess ,"userdata" : data[0]});
          })

         }
       })
        }
        else {
          logger.info(staticConfig.verify_user.messageOnVerificationFailure);               // Log file 
          res.json({message: staticConfig.verify_user.messageOnVerificationFailure ,"userdata":check});
        }
      })
  }catch(error){                                                             //error handling
    logger.info(staticConfig.errorMessage.val );                            // Log file
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});
  }
};