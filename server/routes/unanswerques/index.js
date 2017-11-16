import express from 'express';
import unans from './unanswerques';
import adminques from './adminques';
import deletePendingQuestions from './deletePendingQuestions';
let router = express.Router();

router.get('/',unans);																			//Calls unanswerques route
router.post('/',adminques);																	//Calls adminques route
router.put('/delete',deletePendingQuestions);								//Calls deletePendingQuestions route
export default router;