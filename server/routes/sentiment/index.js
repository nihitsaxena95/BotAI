import express from 'express';
const router = express.Router();
import sentiment from './sentiment';

//Calls answer route

router.post('/',sentiment);			//calls sentiment route
export default router;