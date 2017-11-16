const express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig  from './Config';
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=>{
  try{
    req.body.data.syn.map((data1)=>{
        const resultPromise = session.run(                //Query to create relationship between intent and it's synonyms
          'Match(n:'+req.body.data.label+'{name:"'+req.body.data.labelname+'"}) Create (n)<-[:SameAs]-(y:Synonym{name:"'+data1+'"}) return n,y'
          );
        resultPromise.then(result => {
          session.close();
           // on application exit:
           driver.close();
         });
      })        
    logger.info(staticConfig.addSyn.RelationshipCreated);            // making logs
    res.json({status:true,message:staticConfig.addSyn.RelationshipCreated});
  }catch(error){                                             // error handle if suddenly error occur in database
    logger.info(staticConfig.addSyn.Error);            // making logs
    res.json({status:false, message:staticConfig.addSyn.Error,data:error});
  }
};