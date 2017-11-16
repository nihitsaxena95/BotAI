let express = require('express');
let router = express.Router();
import staticConfig  from './Config';                                //config file
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config'; 
import logger from '../../log4js';
//Create connection with neo4j database
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
  try{
    req.body.syn.map((data)=>{
      const resultPromise = session.run(                    //Query to add synonym
        "create (a:Synonym {name:'"+data+"'}) return a"  
        );
      resultPromise.then(result => {
        session.close();
        logger.info(staticConfig.addsyn.datafound);
        res.json({status:true,message:staticConfig.addsyn.datafound,data:result.records[0]});
  // on application exit:
  driver.close();
});
    })
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addsyn.Error);            // making logs
    res.json({status:false, message:staticConfig.addsyn.Error,data:error});
  }  
};