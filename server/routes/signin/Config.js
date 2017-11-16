import config from '../../config/config';

module.exports = {
    facebookLogin : {
        passportAuth : 'facebook',
        email : 'email',
        userData : 'Userdata'
    },
    url : {
        failureRedirect : config.clientRedirectUrl,
    redirect : config.clientRedirectUrl+'/#/socialloginredirect'
    },
    googleLogin : {
        passportAuth : 'google',
        email : 'email',
        userData : 'Userdata',
        profile : 'profile'
    },
     signin : {
    messageErrorNotFind : 'Error to find',
    messageSuccessFind : 'Authentication failed. User not found.',
    messageNodemailService : 'Gmail',
    messageNodemailAuthEmail : 'dummyid20@gmail.com',
    messageNodemailAuthPassword : 'dummyid2608',
    messageNodemailOptionEmail : '"Dummy" <dummyid20@gmail.com',
    messageNodemailOptionSubject : 'Activation Mail - Penny',
    messageNodemailErrorEmail : 'Error in Sending Mail',
    messageNodemailSuccessEmail: 'Mail Sent . Mail Sent',
    messagePasswordFailCheck : 'Authentication failed. Wrong password',
    messagePasswordSuccessCheck : 'Successfull Login'
  },
    errorMessage:"Service Unavailable"
}