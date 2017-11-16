import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';
import staticConfig from './Config';

export default (req,res)=>{
	try{
		flow_schema.insertMany(req.body,{upsert:true},(error,data)=>{
			if(data==undefined){
			logger.info(staticConfig.setFlow.messageNotfound)		//making logs
			res.json({status:false,message:staticConfig.setFlow.messageNotfound,data : null });			
		}
		else if(data){
			logger.info(staticConfig.setFlow.messageFound)		//making logs
			res.json({status:true,message:staticConfig.setFlow.messageFound,data : data});
		}
		else{
			logger.info(staticConfig.setFlow.error)		//making logs
			res.json({status:false,message:staticConfig.setFlow.error,'error' : error });
		}
	})
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getFollow.error);                  // making logs
    res.json({status:false, message:staticConfig.getFollow.error,data:error});
  }
}