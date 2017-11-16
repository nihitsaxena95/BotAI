module.exports = {
	ques:{
		data:{ question:"what is retirement plan?", email: "stshivamtripathi7@gmail.com"},
		findyield:{data:"It is domain"}
	},
	updateuserdata:{
		send:{ status: true,
			message: 'Successfull Login',
			data: 
			{ _id: '59f1dd98e680c117c065d55c',
			name: 'Abc',
			email: 'abc@gmail.com',
			password: '$2a$10$JdbaQnY70K86rOH8KmVzyeigegpe.K7s96JvzgzMlTiJ12CWkodHW',
			type: 'User',
			status: true,
			policy: [],
			questions:[ ],
			badCount: 0 } },
			updateyield:{ ok: 1, nModified: 1, n: 1 }
		},
		forgotpassword:{
			findyield:{
				"_id" : "59c20a8090862e01a0c96034",
				"name" : "shagun",
				"username" : "shagun",
				"contact_no" : 2983472343,
				"email" : "shagunsankla61@gmail.com",
				"password" : "jasmine9",
				"type" : "User",
				"status" : true,
				"policy" : [ ]},
				sendyield:{email : "shagunsankla61@gmail.com"},
				updateyield:{
					status:true, message : "success"
				}
			},
			warningfindresponse:{
				_id:'59c393d31f0a19213741e83e',
				name:'Shivam',
				username:'shivam7',
				contact_no:8922861748,
				email:'stshivam@gmail.com',
				password:'123@g',
				status:false,
				type:'user',
				policy : []
			},

			warningUpdateresponse:
			{
				status:true,message : "Success Added",data:{ ok: 1, nModified: 1, n: 1 } 
			},
			setpassword : {     
				positiveSetpasswordfind:
				{
					status:true,
					message : "Success Added",
					data: {
						name : "naman",
						username: "naman",
						contact_no : 6787678987,
						email : "naman@gmail.com",
						password : "naman@26",
						type: "User",
						status : true,
						policy : [ ]
					}
				},
				positiveSetpasswordupdate:
				{
					status:true
				},
				negativeSetpasswordupdate:
				{
					status:true,message : "Success Added", 
					data: {
						name : "naman",
						username: "naman",
						contact_no : 6787678987,
						email : "naman@gmail.com",
						password : "naman@26",
						type: "User",
						status : true,
						policy : [ ]
					}
				}

			},
			verifyuser:{
				findyield:{
					_id:'59c393d31f0a19213741e83e',
					name:'Shivam',
					username:'shivam7',
					contact_no:8922861748,
					email:'stshivam@gmail.com',
					password:'123@g',
					status:false,
					type:'user',
					policy : []
				},
				updateyield:{
					status:true,message : "Success Added",data:{ ok: 1, nModified: 1, n: 1 } 
				},
				findyield2:{
					_id:'59c393d31f0a19213741e83e',
					name:'Shivam',
					username:'shivam7',
					contact_no:8922861748,
					email:'stshivam@gmail.com',
					password:'123@g',
					status:true,
					type:'user',
					policy : []
				}
			},
			signin:{
				sendyield:{"email": "user_test@example.com", "password" : "12345"},
				findyield:{
					name : 'abhishek',
					username : 'abhi',
					contact_no : '1234567890',
					email:"abkills2@gmail.com",
					password:"1234",
					status : true,
					type : 'user',
					policy : []
				},
				signinstubyield:{"email": "user_test@example.com", "password" : "$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi"}
			},
			registertestsend:{"email":"stshivam@gmail.com", "password":"12345"},

			forcelogout:{
				logout:{
					email:"stshivamtripathi7@gmail.com",
					badCount:0
				},
				updateyield:{ok:1, nModified:1, n:1},
				send:{email:"stshivamtripathi7@gmail.com"}
			},
			addtask:{
				updateyield:{ ok: 1,nModified: 1, n: 1},
				send:{ message: 
					[ { TaskName: 'Task Name ' },
					{ question: { id: 1, question: 'Question ', answertype: 'Answer Type', type: 'Q' } },
					{ positiveresponse: { id: 1, answer: 'Answer ', question: 'Answer Response ', next: 'Answer Next Step ' }  },
					{ negativeresponse: { id: 1, answer: 'Negative Answer ', question: 'Negative Response', next: 'Negative Next Step' } } ] 
				}
			},
			unanswerques:{
				question:{question:"what is investment"}
			},
			adminques:{
				question:{question:"what is investment"},
				if:{ ok: 1,nModified: 1, n: 1},
					else:{ ok: 0,nModified: 0, n: 0}
				},
			followup:{
				findyield:{task : "retirement plan-about" , question : [
				{
					question : "Sure. But first, we will need your risk profile score. Do you have one?",
					id : 1,
					answertype : "Y/N",
					type : "Q",
					genre : "Introduction"
				}]},
				send:{counter:"Tell me about 401k"}
			},
			getfollow:{
				findyield:{task:"Mutual Funds task"},
			},
			setflow:{
				insertyield:{Flowname:"Mutual Funds"},
				send:{Flowname:"Retirement plan"}
			},
			nextfollowup:{
				findyield:{task:"product",question:{type:'q'}},
				send:{task:"product", question:{type:'q'}}
			},
			getdata:{
				findyield:{name:"ishan", gender:"male", task:"product"},
				send:{name:"ishan"}
			},
			resetpassword:
			{

				positiveMatchfind:
				{
					"_id" : "59c20a8090862e01a0c96034",
					"name" : "shagun",
					"username" : "shagun",
					"contact_no" : 2983472343,
					"email" : "shagunsankla61@gmail.com",
					"password" : "'$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi'",
					"type" : "User",
					"status" : true,
					"policy" : [ ]
				},
				positiveMatchupdate:
				{
					status:true,
					message : "success",
					data:{ok:1, nModified : 1, n:1}
				},
				positiveNomatchfind:
				{
					"_id" : "59c20a8090862e01a0c96034",
					"name" : "shagun",
					"username" : "shagun",
					"contact_no" : 2983472343,
					"email" : "shagunsankla61@gmail.com",
					"password" : "jasmine9",
					"type" : "User",
					"status" : true,
					"policy" : [ ]
				},
				findyield:{
					"_id" : "59c20a8090862e01a0c96024",
					"name" : "shagun",
					"username" : "shagun",
					"contact_no" : 2983472343,
					"email" : "shagunsankla61@gmail.com",
					"oldpassword" : "$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi",
					"type" : "User",
					"status" : true,
					"policy" : [ ]
				},
				positiveNomatchsend:
				{
					newpassword : "1234",oldpassword: "12345"
				},
				negativeEmailnomatchsend:
				{
					newpassword : "jasmien9",oldpassword: "jasmi"
				},
				negativeEmaildontmatchsend:
				{
					newpassword : "jasmien9",oldpassword: "jasmi"
				}
			},


			uNanswerquesCount:{

			questions:[{question:"what is retirement?"}]
			},

          uNanswerquesCount:{

			questions:[null]
			}

		}