let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig  from './Config'; 																 //config file
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

/*======================Add new synonyms============================*/
export default (req, res)=>{
	try{
		const resultPromise = session.run(				
		//Query to create relationship between intent and it's synonyms
		'Match(n:'+req.body.data.labelname+'{name:"'+req.body.data.propname+'"}) Create (n)<-[:SameAs]-(y:Synonym{name:"'+req.body.data.syn+'"}) return n,y'
		);
		resultPromise.then(result => {
			session.close();
			logger.info(staticConfig.addcontextsyn.success);            // making logs
			res.json({status:true,message:staticConfig.addcontextsyn.success,data:result.records[0]});
			driver.close();
		});
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addcontextsyn.Error);            // making logs
    res.json({status:false, message:staticConfig.addcontextsyn.Error,data:error});
  }			
};