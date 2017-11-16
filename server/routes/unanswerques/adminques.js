let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');
import staticConfig from './Config' ;
import logger from '../../log4js';

router.post('/', function(req, res) {  
  demo.find((err,data)=> {
    if(data.length === 0) {
      demo.insertMany({questions : [{question : req.body.question}]},(err,data)=> {
        if(err) {                                             //Error
          logger.info(staticConfig.adminques.Error);        // Log file
          res.json({status:false,message:staticConfig.adminques.Error,data:null});
        } else {                                              //Data Found
          logger.info(staticConfig.adminques.Sucess);         // Log file
          res.json({status:false,message:staticConfig.adminques.Sucess,data:data});
        }
      })
    } else {
      demo.update({},{$addToSet : {questions : req.body}},(err,data)=>{
        if(err)
        {                                                      //Error
          logger.info(staticConfig.adminques.Error);           // Log file 
          res.json({status:false,message:staticConfig.adminques.Error,data:null});
        }
        else if(data==undefined){                                 //Data not found
          logger.info(staticConfig.adminques.DataNotFound);       // Log file
          res.json({status:false,message:staticConfig.adminques.DataNotFound,data:null});
        }
        else{                                                   //Data Found    
          logger.info(staticConfig.adminques.Sucess);           // Log file
          res.json({status:true,message:staticConfig.adminques.Sucess,data:data});
        }
      })
    }
  })
})
module.exports = router;