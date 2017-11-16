export const urlConfig= {
	
	/*===========User chat=========*/
	UserChatfetch:"/answerbot",
	UserChatgetSentiment:"/sentiment",
	UserChatforceLogout:"/forceLogout",
	UserChatgetquestions:"/ques_ans",
	UserChattriggerfollowup:"/followup/selectfollow",
	UserChatnextfollowup:"/followup",
	UserChatchecklink:"/answerbot/referlink",	
	updateUserdataUrl : "/updateUserdata",
	UserResetPasswordfetch:"/reset_password/",
	UserChatunansweredquestion:"/unques",

	/*=============Admin Add Task================*/
	AdminAddTaskSubmit:"/addtask",

	/*===========Admin Bot Training============*/
	AdminBotTraininggetunanswer:"/unques",
	AdminBotTraininggetQues:"/questoken",
	AdminBotTraininggetIntent:"/train_intent",
	AdminBotTraininggetContext:"/train_intent/getContext",
	AdminBotTrainingaddSentence:"/train_intent/traindomain",
	AdminBotTrainingchangeIntent:"/train_intent/getIntent",
	AdminBotTrainingfetch:"/train_intent/updateIntent",
	AdminBotTrainingsetSynonym:"/train_intent/setSynonym",
	AdminBotTrainingcontextSynonym:"/train_intent/contextsynonym",
	AdminBotTrainingsendques:"/unques",
	AdminBotTrainingaddIntent:"/train_intent",
	AdminBotTrainingaddSynonym:"/train_intent",
	AdminBotTraininggetRelatedEntity:"/train_intent/getRelatedEntity",
	AdminBotTrainingaddMoreSynonym:"/train_intent/addSynonym",
	AdminBotTrainingdeleteSynonym:"/train_intent/deleteSynonym",
	AdminBotTrainingsuggest:"/suggest",
	AdminBotTrainingdeleteIntent:"/train_intent/deleteIntent",
	AdminBotTrainingdeletePendingQuestions:"/unques/delete",

	/*===========Admin Context=============*/
	AdminContextgetIntent:"/train_intent",
	AdminContextgetAllContext:"/train_intent/getContext",
	AdminContextaddContext:"/addcontext",
	AdminContextaddSynonym:"/addcontext",
	AdminContextsubmitContext:"/addcontext",
	AdminContextfetchflow:"/followup",
	AdminContextaddflowtask:"/addflowContext",

	/*=============Admin Train Domain=================*/
	AdminTrainDomainaddSentence:"/train_intent/traindomain",
	AdminTrainDomainchangeIntent:"/train_intent/getIntent",
	AdminTrainDomainfetch:"/train_intent/updateIntent",
	AdminTrainDomainsave:"/followup",
	AdminTrainDomaingetdata:"/followup/getdata/",

	/*==================Admin Create Flow====================*/
	AdminCreateFlowfetch:"/followup",

	/*==============Admin Edit Context=================*/
	AdminEditContextgetIntent:"/editContext/getIntentContext",
	AdminEditContextgetAllContext:"/train_intent/getContext",
	AdminEditContextgetContext:"/train_intent/getContext",
	AdminEditContextdeleteContext:"/addcontext/deleteContext",
	AdminEditContextgetContextSynonym:"/editContext",
	AdminEditContextgetContextInfo:"/editContext/getContextInfo",
	AdminEditContextaddMoreSynonym:"/editContext/editAddSynonym",
	AdminEditContextdeleteSynonym:"/editContext/editDeleteSynonym",
	AdminEditContextupdateContext:"/editContext/editLink",
	AdminEditContexttfetchflow : "/followup"

}
