module.exports = {
	forgotpassword:{
    MessageNodemailAuthEmail : 'dummyid20@gmail.com',
    MessageNodemailAuthPassword : 'dummyid2608',
    MessageNodemailOptionEmail : '"Dummy" <dummyid20@gmail.com',
    MessageNodemailOptionSubject : 'forget password- Penny',
    MessageNodemailService : 'Gmail',
    MessageErrorNotFind:'Error in finding email',
    MessageErrorNotUpdate:'Error in updating status to set password',
    MessageErrorMailNotSent:'Error in sending mail',
    MessageSuccessMailSent:'Mail sent to set password',
    startmail:`<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    </head>
    <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666 ; background:white; text-decoration: none;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
    <tr align="center">
    <td valign="top" style="width: 100%;">
    <table style="padding: 0px; border: 0; max-width: 520px; text-align: center;" width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
    <tr align="center">
    <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 14pt; font-weight: bold; color: #333333 ;">
    <h1>Hi `,
    middlemail:`</h1>
    <p style="margin: 0; padding: 0;">We got your request to change password, Please click below.</p>
    </td>
    </tr>
    <tr align="center">
    <td style="height: 30px; width: 100%;">&nbsp;</td>
    </tr>
    <tr align="center">
    <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 11pt;">
    <a style="padding: 10px 20px; border: 1px solid #283e4a ; 
    -webkit-border-radius: 999em; -moz-border-radius: 999em;
    border-radius: 999em; line-height: 24px; font-size: 11pt; 
    background-color: #283e4a ; color: white; text-decoration: none;" 
    href="`,
    middlemail2: `/#/setpassword/`,
    endmail:`">Reset Password</a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    <h3 style="text-align: -webkit-center">Thank You !!</h3>
    </body>
    </html>`
    
  }
}