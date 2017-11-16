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
    let finaloutput=[];  
    const resultPromise = session.run(                   //Query to get Entities for selected intent or sub intent
      "match (n:"+ req.body.intentName.label +" {name:'"+req.body.intentName.itemName+"'})-[]-(m) return n,m"
      );
    resultPromise.then(result => {
      session.close();
      for(var i in result.records)
      {
        var output=result.records[i];
        finaloutput.push(output._fields[1].properties.name); 
      }
    logger.info(staticConfig.getRelatedEntity.success);            // making logs
    res.json(finaloutput);
    // on application exit:
    driver.close();
  });
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getRelatedEntity.Error);            // making logs
    res.json({status:false, message:staticConfig.getRelatedEntity.Error,data:error});
  }  
};