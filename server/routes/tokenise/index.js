import express from 'express';
const router = express.Router();
import tokenise from './tokenise';

//Calls tokenise route

router.post('/',tokenise);
export default router;