import express from 'express';
import getUnanswerCount from './getUnanswerCount';
import getNodesCount from './getNodesCount';
const router = express.Router();


router.get('/getUnanswerCount',getUnanswerCount);
router.get('/getNodesCount',getNodesCount);
export default router;
