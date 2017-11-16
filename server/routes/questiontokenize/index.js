import express from 'express';
const router = express.Router();
import question from './questiontokenize';

//Calls answer route

router.post('/',question);

export default router;