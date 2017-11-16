import express from 'express';
import warning_page from './warning_page';
const router = express.Router();

router.get('/:id',warning_page);			//Calls the route
export default router;
