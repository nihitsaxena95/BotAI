import express from 'express'; 
import logger from '../../log4js';
import add_task from './../../model/add_task';
import staticConfig  from './Config';														// File for static message
export default (req,res)=>{
	try
	{
		add_task.update({taskname : req.body.message[0].TaskName},
		{$addToSet :{data : req.body.message}},{upsert:true},
		(error,data)=>{
		if(data){																											//If data found
    	logger.info(staticConfig.addtask.DataFound); 							 // Log file
			res.json({status:true,message:staticConfig.addtask.DataFound,data : data})
		}
		else if(data==undefined){																			//if data is undefined
    	logger.info(staticConfig.addtask.DataNull); 							 // Log file
		res.json({status:false,message:staticConfig.addtask.DataNull,data :null })
		}
		else{																													//else if error
    	logger.info(staticConfig.addtask.DataNotFound); 					 // Log file
			res.json({status:false,message:staticConfig.addtask.DataNotFound,'error' : error })
		}
	})
	}catch(error){																	// error handle if suddenly error occur in database
  	logger.info(staticConfig.addtask.DataNotFound); 					 // making logs
  	res.json({status:false, message:staticConfig.addtask.DataNotFound,data:error});
	}	
}