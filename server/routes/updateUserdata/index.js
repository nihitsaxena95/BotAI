import express from 'express';
import updateUserdata from './updateUserdata';

const router=express.Router();

updateUserdata(router);

export default router;
