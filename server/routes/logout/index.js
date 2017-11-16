import express from 'express';
const router = express.Router();
import forcelogout from './forcelogout';

//Calls forceLogout route

router.put('/',forcelogout);			//calls forcelogout route
export default router;