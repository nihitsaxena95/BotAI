let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig from './Config';								//Config File imported
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	try{																		//Query to enter 
		const resultPromise = session.run(
			"MATCH (n:"+req.body.intentName.label+")WHERE n.name = '"+req.body.intentName.itemName+"'CREATE (m:Synonym {name : '"+req.body.synonymname+"'} )-[:SameAs]->(n) return m"
			);
		resultPromise.then(result => {
			session.close();																			//Close session
			logger.info(staticConfig.addMoreSynonym.success);			//Log File
			res.json(result.records[0]);
		 // on application exit:
		 driver.close();
		});
	}catch(error){                                 						 // error handle if suddenly error occur in database
    logger.info(staticConfig.addMoreSynonym.Error);            // making logs
    res.json({status:false, message:staticConfig.addMoreSynonym.Error,data:error});
  }	
};
