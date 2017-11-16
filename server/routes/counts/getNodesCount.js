let express = require('express');
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticConfig from './Config';
import logger from '../../log4js';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
	try{
		let intent = [];
		let resultPromise = session.run(
			'match(domain:Domain) return count(domain)'
			);
		resultPromise.then((result)=>{
			intent.push({[staticConfig.Domain] : result.records[0]._fields[0].low})
			const resultPromise = session.run(
				'match(subdomain:SubDomain) return count(subdomain)'
				);
			resultPromise.then((result)=>{
				intent.push({[staticConfig.SubDomain] : result.records[0]._fields[0].low})

				const resultPromise = session.run(
					'match(entity:Entity) return count(entity)'
					);
				resultPromise.then((result)=>{
					intent.push({[staticConfig.Entity] : result.records[0]._fields[0].low})
					const resultPromise = session.run(
						'match(intent:Intent) return count(intent)' 
						)
					resultPromise.then((result) => {
						intent.push({[staticConfig.Intent] : result.records[0]._fields[0].low})
						res.json(intent);
					})
				})
			})
		})
}catch(error){           // error handle if suddenly error occur in database
   logger.info(staticConfig.errorMessage);        // making logs
   res.json({status:false, message:staticConfig.errorMessage,data:error});
 }
};
