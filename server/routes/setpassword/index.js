/*Preeti Singh
22/10/2017*/

import express from 'express';
import setPassword from './set_password';
const router = express.Router();
  
 //calls setpassword route
router.put('/:username/:id',setPassword);				//calls setpassword route

export default router;