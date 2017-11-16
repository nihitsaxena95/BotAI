import config from '../config/config';

export default {
		'fbAuth' : {
		'clientID' 	: '154336451818728',
    'clientSecret' : 'd089e4e83f212d0e04953924cb7f6e97',
    'callbackURL' : "http://localhost:8000/auth/facebook/callback",
    'profileFields':   ['id','displayName','gender','email']
	},

	'googleAuth' : {
		'clientID' 			: '1079894344889-o9hqu2tidpfgie03i7cevghf4oo008hd.apps.googleusercontent.com',
		'clientSecret' 	: 'rGny0ohP_yXExM4qrbcIoj5T',
		'callbackURL' 	: 'http://localhost:8000/auth/google/callback',
		'profileFields'	:   ['id','displayName','gender','email']
	}
}
