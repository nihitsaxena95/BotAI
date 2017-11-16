import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';
import staticConfig from './Config';

export default (req,res)=>{
	try{
		flow_schema.findOne({task : req.params.name},(error,data)=>{
		logger.info(staticConfig.getdata.message)		//making logs
		res.json(data);				//response to client
	})
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getdata.Error);                  // making logs
    res.json({status:false, message:staticConfig.getdata.Error,data:error});
  }
}