let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import logger from '../../log4js';
import config from '../../config/config';
import staticConfig from './Config';
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	try{
	const resultPromise = session.run(		//Query to delete Intent or SubIntent
		"MATCH (a:"+req.body.data.label+" {name:'"+req.body.data.itemName+"'}) detach delete a"
		);
	resultPromise.then(result => {
		session.close();
		logger.info(staticConfig.deleteintent.success)
		res.json({status:true,message:staticConfig.deleteintent.success,data:result});		
	  // on application exit:
	  driver.close();
	});
	}catch(error){                                             // error handle if suddenly error occur in database
    logger.info(staticConfig.deleteintent.Error);            // making logs
    res.json({status:false, message:staticConfig.deleteintent.Error,data:error});
  }		
};