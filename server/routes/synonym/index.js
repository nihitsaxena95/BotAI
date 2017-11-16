import express from 'express';
import synonym from './addSynonym';
import relation from './addRelation';

let router = express.Router();

router.post('/',synonym);													//Calls synonym route
router.post('/relation',relation);								//Calls relation route	

export default router;