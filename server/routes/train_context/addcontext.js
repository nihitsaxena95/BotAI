let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticConfig  from './Config';																 //config file
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
import createSynonym from './createSynonym';
import createlink from './createlink';
import addflowcontext from './addflowContext';
import logger from '../../log4js';

export default(req, res)=>{
	try{
		req.body.context.name = req.body.context.name.toLowerCase();

	/*-========================If Domain===========================*/
	if(req.body.selectedContext.label != "") {
		if(req.body.selectedContext.label == staticConfig.domain.domain) {
			const resultPromise = session.run(											//Query for neodb if domain
				'match(a: '+req.body.selectedContext.label+' {name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:SubDomain {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
				);
			resultPromise.then(result => {
				session.close();
				createSynonym(req.body);
				addflowcontext()
				logger.info(staticConfig.addcontext.success);           						 // making logs
				res.json({status : true, result : result.records[0]})
				driver.close();
			});
		}

		/*===================If SubDomain===================*/
		else if(req.body.selectedContext.label == staticConfig.subdomain.subdomain) {
			const resultPromise = session.run(										//Query for neodb if subDomain
				'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:Entity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
				);
			resultPromise.then(result => {
				session.close();
				createSynonym(req.body)
				logger.info(staticConfig.addcontext.success);           						 // making logs
				res.json({status : true, result : result.records[0]})
				driver.close();
			});
		}

		/*=================If Entity======================*/
		else if(req.body.selectedContext.label ==staticConfig.entity.entity) {
			const resultPromise = session.run(																	//Query for neodb if Entity
				'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:SubEntity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
				);
			resultPromise.then(result => {
				session.close();
				createSynonym(req.body)
				logger.info(staticConfig.addcontext.success);            					// making logs
				res.json({status : true, result : result.records[0]})
				driver.close();
			});
		}
	}

/*====================If any other Context=======================*/
	else {
		const resultPromise = session.run(										//Query for neodb if any other context
			'merge(a:Domain {name :"'+req.body.context.name+'"}) return a'
			);
		resultPromise.then(result => {
			session.close();
			createSynonym(req.body)
			logger.info(staticConfig.addcontext.success);            // making logs
		  res.json({status : true, result : result.records[0]})
		  driver.close();
		});
	}
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addcontext.Error);            // making logs
    res.json({status:false, message:staticConfig.addcontext.Error,data:error});
  }	
}