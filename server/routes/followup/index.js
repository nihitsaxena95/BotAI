import express from 'express';
const router = express.Router();
import followup from './followup';
import nextfollowup from './nextfollowup';
import setflow from './setflow';
import getfollow from './getfollow';
import getdata from './getdata';

router.post('/selectfollow',followup);			//calls followup route
router.get('/',getfollow);						//calls getfollow route
router.post('/',setflow);							//calls setflow route
router.put('/',nextfollowup);						//calls nextfollowup route
router.get('/getdata/:name',getdata);					//calls getdata route
export default router;
