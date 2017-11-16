module.exports = [
{task : "retirement plan-about" , question : [
{
	question : "Sure. But first, we will need your risk profile score. Do you have one?",
	id : 1,
	answertype : "Y/N",
	type : "Q"
},
{
	id : 1,
	answer : false,
	question : "No problem. I can help you with it. You will have to need to answer a series of questions. It will only take 5 minutes of your time. Should I start?",
	type : "T",
	next : 2
},{
	id : 1,
	answer : true,
	question : "Okay, How may I help you.",
	type : "F",
	next : -1
},
{
	id : 2,
	question : "After how many years you will start withdrawing money from your investments?",
	answertype : "NUM",
	type : "Q"
},
{
	id : 2,
	answer : true,
	question : "Alright, Answer following question to know best.",
	type : "T",
	next : 3
},{
	id : 2,
	answer : false,
	question : "Oops! Thats not a Valid Input, Kindly enter Valid Number of years",
	type : "F",
	next : 2
},
{
	id : 3,
	question : "After you start withdrawing money,in how year do you plan to spend them all?",
	answertype : "NUM",
	type : "Q"
},
{
	id : 3,
	answer : true,
	question : "Alright, Answer following question to know best.",
	type : "T",
	next : 4
},{
	id : 3,
	answer : false,
	question : "Oops! Thats not a Valid Input, Kindly enter Valid Number of years",
	type : "F",
	next : 3
},
{
	id : 4,
	question : "Describe your scale of Knowledge of investments on the scale of 1 to 10",
	answertype : "NUM10",
	type : "Q"
},
{
	id : 4,
	answer : true,
	question : "Great got it!",
	type : "T",
	next : 5
},{
	id : 4,
	answer : false,
	question : "Oops! Thats not a Valid Input, Kindly place it in the scale of 1 to 10",
	type : "F",
	next : 4
},
{
	id : 5,
	question : "When you invest money to what you give more importance,investment losing value or investment gaining value on the scale of 0 to 8",
	answertype : "NUM8",
	type : "Q"
},
{
	id : 5,
	answer : true,
	question : "Great got it!",
	type : "T",
	next : 6
},{
	id : 5,
	answer : false,
	question : "Oops! Thats not a Valid Input, Kindly place it in the scale of 1 to 8",
	type : "F",
	next : 5
},
{
	id : 6,
	question : "Select the investments you currently own or in past you owned :- ",
	option : [
		{
			"value" : "A. Bond or bond funds"
		},
		{
			"value" : "B. Stock or stock funds"
		},
		{
			"value" : "C. International securities or international funds"
		}
	],
	answertype : "ABC",
	type : "Q"
},
{
	id : 6,
	answer : true,
	question : "Great got it!",
	type : "T",
	next : 7
},{
	id : 6,
	answer : false,
	question : "Oops! Thats not a Valid Input, Kindly Select from the provided option",
	type : "F",
	next : 6
},
{
	id : 7,
	question :"If in past 3 months the overall value of stock market lost 25% of its vale then what would you do:- ",
	"option" : [
		{
			"value" : "A. Sell all your shares"
		},
		{
			"value" : "B. Sell some of your shares"
		},
		{
			"value" : "C. Do nothing"
		},
		{
			"value" : "D. Buy more Shares"
		}
	],
	answertype : "ABCD",
	type : "Q"
},
{
	id : 7,
	answer : true,
	question : "Great got it!",
	type : "T",
	next : 8
},{
	id : 7,
	answer : false,
	question : "Oops! Thats not a Valid Input, Kindly Select from the provided option",
	type : "F",
	next : 7
},
{
	id : 8,
	question : "Below are some scenarios, choose one depending on your choice",
	image : "./assets/img/table.jpeg",
	answertype : "ABCDE",
	type : "Q"
},
{
	id : 8,
	answer : true,
	question : "Your risk profile was derived from your responses which upon analysis led us to place you on the following risk category map.",
	type : "T",
	next : 0
},{
	id : 8,
	answer : false,
	question : "Oops! Thats not a Valid Input",
	type : "F",
	next : 0
}]}]