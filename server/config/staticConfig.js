import config from './config';
export default {
	db:{
   mongoose_Connecting: "connecting to MongoDB...",
   mongoose_Error: "Error in MongoDb connection:",
   mongoose_Connected: 'MongoDB connected!',
   mongoose_Open: 'MongoDB connection opened!',
   mongoose_Reconnected:'MongoDB reconnected!',
   mongoose_Disconnected:'MongoDB disconnected!'
 },
 errorMessage:"Service Unavailable",
 url : {
  failureRedirect : config.clientRedirectUrl,
  redirect : config.clientRedirectUrl+'/socialloginredirect'
},

updateUserdata : {
 errorMessage : "Error in access",
 successMessage : "Success in update User",
 user : 'User',
 admin : 'Admin',
},
reset_password: {
  UserNotFindMessage:"username does not exist",
  OldPasswordNotMatch:"old password doesnot match",
  UpdatePasswordError: "password is not updated",
 undefined:'data is undefined',
  successMessage : "Successfully done"
},
loggerDebugAppjs : {
  Signin:"before call of signin route app.js:98",
  AddTask:"before call of addtask route app.js:100",
  ForgetPassword:"before call of forget password route app.js:101",
  SetPassword:"before call of set password route app.js:103",
  WarningPage:"before call of warning page route app.js:105",
  Neo:"before call of neo route app.js:109",
  Signup:"before call of sign up route app.js:112",
  Tokenise:"before call of tokenise route app.js:114",
  Logout:"before call of logout route app.js:116",
  VerifyUser:"before call of verify user route app.js:118",
  AnswerBot:"before call of answer bot  route app.js:120",
  TrainIntent:"before call of train intent route app.js:122",
  Question:"before call of question route app.js:124",
  UnAnswerQuestion:"before call of unanswer question route app.js:126",
  Synonym:"before call of Synonym route app.js:128",
  FollowUp:"before call of follow up route app.js:130",
  AddContext:"before call of add context route app.js:132",
  Suggest:"before call of suggest route app.js:134",
  QusetionTokenize:"before call of question tokenize route app.js:136",
  Sentiment:"before call of Sentiment route app.js:138",
  EditContext:"before call of edit context route app.js:140",
  UpdateUserData:"before call of update user data route app.js:142",
  ResetPassword:"before call of reset password route app.js:144",
  Counts : "before call of counts route app.js:150"
}
}