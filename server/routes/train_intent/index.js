import express from 'express';
import trainIntent from './train_intent';
import traindomain from './traindomain';
import getIntent from './getIntent';
import getContext from './getContext';
import setSynonym from './setSynonym';
import contextsynonym from './contextsynonym';
import addsynonyms from './addsynonyms';
import addMoreSynonym from './addMoreSynonym';
import getRelatedEntity from './getRelatedEntity';
import deleteSynonym from './deleteSynonym';
import deleteIntent from './deleteIntent';
let router = express.Router();

router.post('/',trainIntent);									          //Calls trainIntent route
router.get('/',getIntent);										          //Calls getIntent route
router.get('/getContext',getContext);					          //Calls getContext route
router.put('/',addsynonyms);									          //Calls addsynonyms route
router.post('/traindomain', traindomain);			          //Calls traindomain route
router.post('/setSynonym',setSynonym);				          //Calls setSynonym route
router.get('/getIntent', getIntent);					          //Calls getIntent route
router.post('/addSynonym',addMoreSynonym);		          //Calls addMoreSynonym route
router.post('/contextsynonym',contextsynonym);          //Calls contextsynonym route
router.post('/getRelatedEntity',getRelatedEntity);			//Calls getRelatedEntity route
router.put('/deleteSynonym',deleteSynonym);							//Calls deleteSynonym route
router.put('/deleteIntent',deleteIntent);								//Calls deleteIntent route
export default router;