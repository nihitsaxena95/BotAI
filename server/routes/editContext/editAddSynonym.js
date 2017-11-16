let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticConfig from './Config';
import logger from '../../log4js';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
try{
	req.body.synonym.map((data)=>{
		const resultPromise = session.run(				//Query to editSynonym
			"match (n:"+req.body.context.label+" {name:'"+req.body.context.itemName+"'}) with n create (n)<-[:SameAs]-(s:Synonym {name:'"+data+"'}) return s"
			);
		resultPromise.then(result => {
			session.close();
			logger.info(staticConfig.editAddSynonym.messageSuccess)    //making logs
			res.json(result.records);			//response to client
  // on application exit:
  driver.close();
		});
	})
}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.editAddSynonym.Error);                  // making logs
    res.json({status:false, message:staticConfig.editAddSynonym.Error,data:error});
  }
};