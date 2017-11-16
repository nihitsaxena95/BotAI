import express from 'express';
import reset_password from './reset_password';
//import passport from 'passport';
//import configPassport from './../../config/passport';

const router =  express.Router();

router.put('/:email',  reset_password);
export default router;