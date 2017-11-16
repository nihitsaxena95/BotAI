import express from 'express';
import getContextSynonym from './getContextSynonym';
import editAddSynonym from './editAddSynonym';
import editDeleteSynonym from './editDeleteSynonym';
import getContextInfo from './getContextInfo';
import editLink from './editLink';
import getIntentContext from './getIntentContext';

let router = express.Router();

router.post('/',getContextSynonym);				//calls getContextSynonym route 
router.post('/editAddSynonym',editAddSynonym);			//calls editAddSynonym route
router.post('/editDeleteSynonym',editDeleteSynonym);		//calls editDeleteSynonym route
router.post('/getContextInfo',getContextInfo);				//calls getContextInfo route
router.put('/editLink',editLink);							//calls editLink route 
router.post('/getIntentContext',getIntentContext);			//calls getIntentContext route 

export default router;