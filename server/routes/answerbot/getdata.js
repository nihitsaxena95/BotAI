const express = require('express');
const fs = require('fs');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticConfig  from './Config';
import logger from '../../log4js';
const uri = config.neo4jUrl;
const driver = neo4j.driver(uri,neo4j.auth.basic("neo4j",config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
  try{
    const resultPromise = session.run(        //Query to fetch property name from neo4j database
      "MATCH (n) WHERE NOT n:Attribute AND NOT n:Intent AND NOT n:SubIntent return n"
      );
    resultPromise.then(result => {
      session.close();
      let main = [];

      let data=result.records.map((data)=>data._fields[0].properties.name);
      
      data.map((d) => {
        let flag = 0;
        main.map((m) => {
          if(m == d) {
            flag++;
          }
        })
        if(flag==0) {
          main.push(d);
        }
      })
      
      let file = fs.createWriteStream('./dataset.json');
      file.on('error', (err)=> {
       /* error handling */
     }); 
      file.write(JSON.stringify( main,null,2));
      file.end();
    // on application exit:
    driver.close();
    logger.info(staticConfig.getdata.Label)    //making logs
    res.json({status:true,message:staticConfig.getdata.Label,data:main});     //response to client
  });
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getdata.Error);                  // making logs
    res.json({status:false, message:staticConfig.getdata.Error,data:error});
  }
};