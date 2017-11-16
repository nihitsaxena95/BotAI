const express = require('express');
const neo4j = require('neo4j-driver').v1;
import staticConfig  from './Config';
import config from '../../config/config';
import logger from '../../log4js';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

const natural =require('natural');
let router = express.Router();

export default (req, res, next)=>{
  try{
    let wordnet = new natural.WordNet();
    let word=req.body.data.word;
    wordnet.lookup(word, (results)=> {                            //Search for the word entered by the user
      results.forEach((result) =>{
      });
      if(results[0]!=undefined){                                      //When synonym is found
        logger.info(staticConfig.suggest.SynonymFound);                  // making logs
        res.json({status:true,message:staticConfig.suggest.SynonymFound,data : results[0].synonyms});    
      }
      else{                                                       //When synonym is not found
      logger.info(staticConfig.suggest.SynonymNotFound);                  // making logs  
      res.json({status:false,message:staticConfig.suggest.SynonymNotFound,data:null});
    }
  });
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.suggest.Error);                  // making logs
    res.json({status:false, message:staticConfig.suggest.Error,data:error});
  }     
};