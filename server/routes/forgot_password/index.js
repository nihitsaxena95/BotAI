import express from 'express';
import forgotPassword from './forgotpassword';

let router = express.Router();

router.post('/',forgotPassword);			//calls forgotPassword route

export default router;