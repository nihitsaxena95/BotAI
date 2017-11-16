import express from 'express';
import addcontext from './addcontext';
import addsynonyms from './addcontextsyn'
import deleteContext from './deleteContext'

let router = express.Router();

router.post('/',addcontext);																//Calls addcontext route
router.put('/',addsynonyms);																//Calls addsynonyms route
router.post('/deleteContext',deleteContext);								//Calls deleteContext route

export default router;