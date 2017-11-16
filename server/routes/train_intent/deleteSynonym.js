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
    var finaloutput=[];
    const resultPromise = session.run(            //Query to delete Synonym for particular intent or Sub-intent
      "MATCH (a:"+ req.body.intentname.label +" {name:'"+req.body.intentname.itemName+"'})-[r:SameAs]-(b:Synonym {name:'"+req.body.synonymname+"'})DELETE r,b with a match(c:"+ req.body.intentname.label +"Intent{name:'"+req.body.intentname.itemName+"'})-[]-(d) return c,d"
      );
    resultPromise.then(result => {
      session.close();
      for(var i in result.records)
      {
        var output=result.records[i];
        finaloutput.push(output._fields[1].properties.name); 
      }
      logger.info(staticConfig.deleteSynonym.success);
      res.json(finaloutput);    
    // on application exit:
    driver.close();
  });
  }catch(error){                                             // error handle if suddenly error occur in database
    logger.info(staticConfig.deleteSynonym.Error);            // making logs
    res.json({status:false, message:staticConfig.deleteSynonym.Error,data:error});
  }
};