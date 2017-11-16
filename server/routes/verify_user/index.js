import express from 'express';
import verify_user from './verify_user';
const router = express.Router();

router.get('/:id', verify_user);									//Calls the route
export default router;