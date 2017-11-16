let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig  from './Config'; 																 //config file
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session(); //config file


export default(object,label)=>{
	try{
		/*======================Query to add flow to context===========================*/

		object.completeContext.map((intent) =>{
			if(intent.flow) {											
				const resultPromise = session.run("MATCH (ee:"+label+") where ee.name ='"+object.context.name+"' MATCH (ee)-[:"+intent.name+"]->(xx) CREATE (ff:Counter {name : '"+intent.flow+"', value : '"+intent.flow+"'}), (xx)-[:answer]->(ff) return ee,ff,xx");
				resultPromise.then(result => {
				});
			}
		});
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addcontextsyn.Error);            // making logs
    res.json({status:false, message:staticConfig.addcontextsyn.Error,data:error});
  }		
};
