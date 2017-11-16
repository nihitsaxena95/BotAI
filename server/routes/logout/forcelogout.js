import user from '../../model/register_schema';
import express from 'express'; 
import staticConfig from './Config';
import logger from '../../log4js';

export default (req,res) => {
  try{
   user.updateOne({'email' : req.body.email }, {$set : {badCount : 0}},
    (err, data) => {
      if(err) {
      //error occured
      logger.info(staticConfig.forcelogout.Error);                    //making logs
      res.json({status:false,message :staticConfig.forcelogout.Error, userdata : null}) //response to client
    }
    else if(data==undefined){
      logger.info(staticConfig.forcelogout.Error);                   //making logs
      res.json({status:false,message :staticConfig.forcelogout.Error, userdata : null})       //response to client
    }    
    else {
      //reset bad count
      logger.info(staticConfig.forcelogout.ResetBadCount);           //making logs
      res.json({status : true, message:staticConfig.forcelogout.ResetBadCount})      //response to client
    }
  })
  }catch(error){                                                      // error handle if suddenly error occur in database
    logger.info(staticConfig.getFollow.Error);                        // making logs
    res.json({status:false, message:staticConfig.getFollow.Error,data:error});
  }
}