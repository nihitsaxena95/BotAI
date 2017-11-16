let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import staticConfig from './Config';
import logger from '../../log4js';
import config from '../../config/config';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
  try{
   let intents = [];
   const resultPromise = session.run(
     "match (n:"+req.body.context.label+" {name:'"+req.body.context.itemName+"'})-[r]->(y:Attribute) return y"
     );
   resultPromise.then(result => {
     session.close();
     result.records.map(result => {
       if(result._fields[0].properties.name != 'type' && result._fields[0].properties.name != 'Type'){
         intents.push(result._fields[0]);
       }
     })
    logger.info(staticConfig.getIntentContext.messageSuccess)    //making logs
   res.json(intents);     //response to client
 // on application exit:
 driver.close();
});
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getContextInfo.Error);                  // making logs
    res.json({status:false, message:staticConfig.getContextInfo.Error,data:error});
  }
};