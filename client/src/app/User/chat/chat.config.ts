export const testConfig={
 getContext:{
   positive:{
     status: true,
     message: "data found",
     data: [
     {bot: "Hi khushboo! How may I Help You?", user: "what is retirement plan?"}
     ]
   },
   negative:{
     status: true,
     message: "data found",
     data: [undefined]
   }
 },
 unansweredquestion:{
   positive:{
     mockResponse:{ ok: 1, nModified: 1, n: 1 },
     answer:"Tell me about 401K"
   },
   negative:{
      mockResponse:{ ok: 1, nModified: 0, n: 1 },
     answer:"Tell me about 401K"
   }
 }
 
}