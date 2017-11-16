let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig  from './Config'; 																 //config file
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
import createlink from './createlink';

export default (body) => {
	try{
		let flag = 0;
		let synonym = [];

		if(body.synonym != undefined)
		{
			body.synonym.map(syn => {
				synonym.push(syn);
			})
		}
		synonym.push(body.context.name);
		synonym.map((syn) => {

			if(body.selectedContext.label != "") {
				/*=====================If Subdomain==================*/
				if(body.selectedContext.label == staticConfig.subdomain.subdomain) {
					const resultPromise = session.run(
						'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:Entity{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
						);
					resultPromise.then(result => {
						session.close();
						flag++;
						driver.close();
						if(flag == synonym.length){
							createlink(body);		
						}
					});
				}

				/*====================If Entity===========================*/
				else if(body.selectedContext.label == staticConfig.entity.entity){  
					const resultPromise = session.run(
						'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:SubEntity{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
						);
					resultPromise.then(result => {
						session.close();
						flag++;
		  		// on application exit:
		  		driver.close();
		  		if(flag == synonym.length){
		  			createlink(body);		
		  		}
		  	});
				}

				/*=========================If any other context===============================*/
				else {
					const resultPromise = session.run(
						'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:SubDomain{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
						);
					resultPromise.then(result => {
						session.close();
						flag++;
		  		// on application exit:
		  		driver.close();
		  		if(flag == synonym.length){
		  			createlink(body);		
		  		}
		  	});
				}
			}

			/*=======================If context label is not defined===========================*/		
			else if(body.selectedContext.label=='') {
				const resultPromise = session.run(
					'match(a:Domain {name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
					);
				resultPromise.then(result => {
					flag++;
		  	// on application exit:
		  	if(flag == synonym.length){
		  		createlink(body);		
		  	}
		  });
			}
		})
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addcontextsyn.Error);            // making logs
    res.json({status:false, message:staticConfig.addcontextsyn.Error,data:error});
  }	
}