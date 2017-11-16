import express from 'express';
const router = express.Router();
import signup from './signup';

//Calls Sign up route
router.post('/',signup);				//Calls signup route

export default router;