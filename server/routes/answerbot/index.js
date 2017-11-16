import express from 'express';
const router = express.Router();
import answer from './answer';
import getdata from './getdata';
import referlink from './referlink';
import unanswerQues from './unansweredques';

//Calls answer route

router.post('/',answer);				//calls answer route
router.get('/',getdata);				//calls getdata route
router.post('/referlink',referlink);		//calls referlink route
router.post('/unanswerQues',unanswerQues);		//calls unanswerQues route
export default router;
