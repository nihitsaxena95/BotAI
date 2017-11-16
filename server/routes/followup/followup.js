import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';
import staticConfig from './Config';

export default (req,res)=>{
	try{
		flow_schema.find({task : req.body.counter},(error,data)=>{
			if(data.length > 0) {
				let main;
				data[0].question.map((data) => {
					if(data.genre == "Introduction") {
						main = data;
					}
				})
				res.json(main);
			}
			else{
			logger.info(staticConfig.followup.messageUndefined)		//making logs
			res.json({status:false,message:staticConfig.followup.messageUndefined,data:null})			//response to client
		}
	})
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.followup.Error);                  // making logs
    res.json({status:false, message:staticConfig.followup.Error,data:error});
  }
}