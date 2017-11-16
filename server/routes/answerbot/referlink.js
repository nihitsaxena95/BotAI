const express = require('express');
const fs = require('fs');
const router = express.Router();
var unfurl = require('unfurled')
import staticConfig  from './Config';
import logger from '../../log4js';

export default (req,res) => {
	try{		
		let main = [];
		let temp = 0;
		let comp = req.body.message.length;
		req.body.message.map((data) => {
			let result = unfurl(data);
			result.then((data) =>{
				temp++;
				main.push(data);
				if(temp == comp) {
					setoutput();
				}
			})
		})

		let setoutput = () => {

			res.json(main);
		}
	}catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.getdata.Error);                  // making logs
    res.json({status:false, message:staticConfig.getdata.Error,data:error});
  }
}
