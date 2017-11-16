// load all the things we need

import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import comparePassword from '../util/comparePassword';

// load up the user model
import User from '../model/register_schema';

// load the auth variables
import configAuth from './authConfig'; // use this one for testing

export default (passport) => {

	// used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

 // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                {
                    return done(err);
                }

                // if no user is found, return the message
                else if (!user)
                {
                    return done(null, false);
                }

                else
                {
                  // check if password matches
                  comparePassword(password,  user.password, (err, isMatch) => {
                    if (isMatch && !err) 
                    {
                      return done(null, user);
                    }
                    else 
                    {
                      return done(null, false);
                    }
                  });
                }     
            });
        });

    }));


  // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.fbAuth.clientID,
        clientSecret    : configAuth.fbAuth.clientSecret,
        callbackURL     : configAuth.fbAuth.callbackURL,
        profileFields   : configAuth.fbAuth.profileFields 

      },

    // facebook will send back the token and profile
    (token, refreshToken, profile, done) => {

        // asynchronous
        process.nextTick(() => {

        	// find the user in the database based on their facebook id
            User.findOne({ 'email' : profile.emails[0].value }, (err, user) => {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                  return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                  } else {
                    // if there is no user found with that facebook id, create them
                    let newUser = new User();
                    newUser.name    = profile.displayName;                 
                    newUser.username = profile.displayName; 
                    newUser.contact_no  = "";
                    newUser.email = profile.emails[0].value;
                    newUser.password = "";
                    newUser.status = true;
                    newUser.type = 'fb';
                    newUser.policy = [];
                    newUser.save((err) => {
                      if (err)
                        throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                      });
                  }
                });
          });
      }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

      },
      (req, token, refreshToken, profile, done) => {
        User.findOne({ 'email' : profile.emails[0].value }, (err, user) => {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                  return done(err, false);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                  } else {
                    // if there is no user found with that facebook id, create them
                    let newUser = new User();
                    newUser.name    = profile.displayName;                 
                    newUser.username = profile.displayName; 
                    newUser.contact_no  = "";
                    newUser.email = profile.emails[0].value;
                    newUser.password = "";
                    newUser.status = true;
                    newUser.type = 'g+';
                    newUser.policy = [];
                    newUser.save((err) => {
                      if (err)
                        return done(err, false);
                      return done(null, newUser);
                    });
                  }
              });
      }));

};