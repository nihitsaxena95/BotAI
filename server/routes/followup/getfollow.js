import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';
import staticConfig from './Config';
export default (req,res)=>{
	try{
			//add_task.insertOne({taskname : req.body.message[0].TaskName , data : req.body.message },(error,data)=>{
				flow_schema.find((error,data)=>{
					if(data.length > 0){
			logger.info(staticConfig.getFollow.messageFound)		//making logs
			res.json(data);
		} else {
			logger.info(staticConfig.getFollow.messageNotfound)		//making logs
			res.json([]);
		}
	})
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getFollow.Error);                  // making logs
    res.json({status:false, message:staticConfig.getFollow.Error,data:error});
  }
}