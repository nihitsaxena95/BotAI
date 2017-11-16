let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig  from './Config'; 																 //config file
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
import createSynonym from './createSynonym';
import createlink from './createlink';

export default(req, res)=>{
	try{
		/*======================Query to delete context===========================*/
		const resultPromise = session.run(
			'match(a:'+req.body.data.label+' {name : "'+req.body.data.itemName+'"}) detach delete a'
			);
		resultPromise.then(result => {
			session.close();
		//closins session
    logger.info(staticConfig.deleteContext.Error);            // making logs
		res.json({status : true, result : result.records[0]})
		driver.close();
		//closing driver
	});
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.deleteContext.Error);            // making logs
    res.json({status:false, message:staticConfig.deleteContext.Error,data:error});
  }
};