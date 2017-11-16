let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');
import staticConfig from './Config' ;
import logger from '../../log4js';

export default (req, res) => {
  try{
    demo.update({},{$pull : {questions :{question: req.body.ques}}},
    {multi:true},(err,data)=>{
      if(err)
      {        //Error
        logger.info(staticConfig.deletependingques.Error);            // making logs
        res.json({status:false,message:staticConfig.deletependingques.Error,data:null});
      }
      else if(data==undefined){        //data not found
        logger.info(staticConfig.deletependingques.DataNotFound);            // making logs
        res.json({status:false,message:staticConfig.deletependingques.DataNotFound,data:null});
      }
      else{        //data found  
      logger.info(staticConfig.deletependingques.DataFound);            // making logs   
        res.json({status:true,message:staticConfig.deletependingques.DataFound,data:data});
      }
    })
  }catch(error){                                  // error handle if suddenly error occur in database
    logger.info(staticConfig.deletependingques.Error);            // making logs
    res.json({status:false, message:staticConfig.deletependingques.Error,data:error});
  }  
}