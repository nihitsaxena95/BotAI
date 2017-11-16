let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticConfig  from './Config';
import logger from '../../log4js';
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default(req, res)=>{
	try{	
		const resultPromise = session.run(					//Query to add new intent or sub-intent into database
			"create(n:"+req.body.data.label+"{name:'"+req.body.data.labelname+"',priority:'"+req.body.data.priority+"'})<-[:SameAs]-(b:Synonym{name:'"+req.body.data.labelname+"'}) Return n"
			);
		resultPromise.then(result => {
			session.close();
			logger.info(staticConfig.train_intent.success);            // making logs
			res.json({status:true,message:staticConfig.train_intent.success,data:result.records[0]});
  // on application exit:
  driver.close();
});
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.train_intent.Error);            // making logs
    res.json({status:false, message:staticConfig.train_intent.Error,data:error});
  }
};