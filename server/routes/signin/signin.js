import express from 'express';
import register from '../../model/register_schema';
import jwt  from 'jsonwebtoken';
import config from '../../config/config';
import passport  from 'passport';
import nodemailer  from 'nodemailer';
import staticConfig  from './Config';
import comparePassword from './../../util/comparePassword';
import logger from '../../log4js';

let router = express.Router();

router.post('/login', passport.authenticate('local-login'), (req, res, next)=> {
 try
 {
 	logger.info(staticConfig.signin.messagePasswordSuccessCheck);           //making logs  
   res.json({status: true, message: staticConfig.signin.messagePasswordSuccessCheck, data: req.user});			//response to client
 }
 catch(error)			// error handle if suddenly error occur in database
 {
 	logger.info(staticConfig.errorMessage.val);           //making logs  
   res.json({status:false, message:staticConfig.errorMessage.val,data:error});			//response to client
 }
});

module.exports = router;


