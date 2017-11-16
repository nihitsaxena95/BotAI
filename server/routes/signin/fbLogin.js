import signinConfig from './Config';  // importing signinconfig file
import config from '../../config/config';
import logger from '../../log4js';
import passport from 'passport';
export default (app, passport) => {

  try{
 // request comes on this route when facebook button is click
 app.get('/facebookLogin', passport.authenticate(signinConfig.facebookLogin.passportAuth, { 
  scope : signinConfig.facebookLogin.email
}));

 // reply from facebook comes on this route
 app.get('/auth/facebook/callback',
   passport.authenticate(signinConfig.facebookLogin.passportAuth,{
     failureRedirect : signinConfig.url.failureRedirect // after request failure
   }), (req, res) => {
    if(res.user == false) {
      res.redirect(signinConfig.url.failureRedirect);
    }
    let data = req.user;
    res.cookie(signinConfig.facebookLogin.userData,{status : true,data : req.user});
     res.redirect(signinConfig.url.redirect);  //after request success
   });
}catch(err){               // error handle if suddenly error occur in database
    logger.info(signinConfig.errorMessage);     //making logs              
    res.json({status:false, message:signinConfig.errorMessage,data:err});   //response to client
  }
}