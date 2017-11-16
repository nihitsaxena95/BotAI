let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');
import staticConfig from './Config';
import logger from '../../log4js';

export default (req,res)=>{
 try{
   demo.find({},(err,data)=>{
   if(err){          //Error
     logger.info(staticConfig.unanswerques.Error);            // making logs
     return res.json({status:false,message:staticConfig.unanswerques,data:null});
     }

     else{         //When data is found
       res.json({[staticConfig.unansCount] : data[0].questions.length});
     }
   })
 }catch(error){                                  // error handle if suddenly error occur in database
   logger.info(staticConfig.errorMessage);            // making logs
   res.json({status:false, message:staticConfig.errorMessage,data:error});

 }   
};
