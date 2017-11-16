import express from 'express';
import suggest from './suggest';
const router = express.Router();

router.put('/', suggest);							//Calls synonym route

export default router;