import express from 'express';
const router = express.Router();
//import forcelogout from './forcelogout';
import neo from './neo4j'
//Calls forceLogout route

router.post('/',neo);							//calls route
export default router;