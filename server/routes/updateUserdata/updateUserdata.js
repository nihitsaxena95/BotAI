import update from '../../model/register_schema';
import staticConfig from './Config';						// File for static message
//import passport from 'passport';
import logger from '../../log4js';	
//import configPassport from './../../config/passport';


export default (app) => {
	try{																	// route protected by JWT authentication
		app.put('/', (req,res) => {
		 // update userdata in mongo
		update.update({
			email: req.body.data.email,		// match email
		},
		{
			$set: {  											// values which is going to update
				name: req.body.data.name, 
				username : req.body.data.username,
				password: req.body.data.password,
				
			}
		},{upsert:true},
		(err,user) => {
			if(err) {  // if err occurs
				logger.info({message:staticConfig.updateUserdata.errorMessage});
				res.json({status: false, message:staticConfig.updateUserdata.errorMessage});
			} 
			else if(user == undefined)
			{		// if email address is not defined
				logger.info({message:staticConfig.updateUserdata.messageUndefined});
				res.json({status: false, message:staticConfig.updateUserdata.messageUndefined});
			}
			else {			// if successfully updated
				logger.info({message:staticConfig.updateUserdata.successMessage});
				res.json({status: true, message:staticConfig.updateUserdata.successMessage, user: user});
			}
		});
	})
	}catch(error){							// error handle if suddenly error occur in database
		logger.info({message:staticConfig.errorMessage.val});
    res.json({status:false, message:staticConfig.errorMessage.val,user:error});
  } 
}