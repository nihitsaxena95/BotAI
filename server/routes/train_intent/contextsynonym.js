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
	const resultPromise = session.run(				//Query to create synonym of context
		"match (n:"+req.body.context.label+"{name:'"+req.body.context.itemName+"'}) create (k:Synonym{name:'"+req.body.word+"'})-[:SameAs]->(n) return n,k"
		);
	resultPromise.then(result => {
		session.close();
		logger.info(staticConfig.contextSynonym.success);            // making logs
		res.json(result.records);
	  // on application exit:
	  driver.close();
	});		
	}catch(error){                                             // error handle if suddenly error occur in database
    logger.info(staticConfig.contextSynonym.Error);            // making logs
    res.json({status:false, message:staticConfig.contextSynonym.Error,data:error});
  }	
};