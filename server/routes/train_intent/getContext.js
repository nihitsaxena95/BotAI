let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticConfig from './Config';
import logger from '../../log4js';
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	try{
		const resultPromise = session.run(			//Query to get Context from database
        "MATCH (n) WHERE NOT n:Attribute AND NOT n:Intent AND NOT n:SubIntent AND NOT n:Synonym  return n"
        );
    resultPromise.then(result => {
        session.close();
        logger.info(staticConfig.getContext.success);            // making logs
        res.json(result.records);
      // on application exit:
      driver.close();
    });
	}catch(error){                                             // error handle if suddenly error occur in database
    logger.info(staticConfig.getContext.Error);            // making logs
    res.json({status:false, message:staticConfig.getContext.Error,data:error});
  }    
};