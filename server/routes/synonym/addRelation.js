let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import logger from '../../log4js';
import staticConfig  from './Config';                                   //config file
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
export default (req, res)=> {
  try{
    req.body.syn.syn.map((data)=>{
      const resultPromise = session.run(                              //Query for adding relation between synonym and intent
        " match (a:Synonym {name:'"+data+"'}),(b:Intent {name:'"+req.body.intent_name+"',meaning:'"+req.body.intent_meaning+"'}) create (a)-[:SameAs]->(b) return a,b"
        );
      resultPromise.then(result => {
        session.close();
        logger.info(staticConfig.addrelation.datafound);            // making logs
        res.json({status:true,message:staticConfig.addrelation.datafound,data:result});
  // on application exit:
  driver.close();
});
    })
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addrelation.Error);            // making logs
    res.json({status:false, message:staticConfig.addrelation.Error,data:error});
  }   
};


