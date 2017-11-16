export const testConfig = {
  addtaskComponent : 
  {
    TaskName: "Hello Ishan",
    question: {
      id: 1, question: "What is your Name", answertype: "Yes/No", type: "Q"
    },
    positiveresponse: {
      id: 1, answer: "Ishan", question: "Hi Ishan", next: "2"
    },
    negativeresponse: {
      id: 1, answer: "No", question: "Bye Idiot", next: "3"
    }
  },
  positiveResponse : { ok: 1, nModified: 1, n: 1 },
  negativeResponse : {ok: 1, nModified: 0, n: 0},
  mockResponse : {
    n : 1,
    nModified : 0,
    ok : 1,
    upserted :[{
      index:0,
      id: "59ffe6c57faf0c544ed192c1"
    }]      
  },
  mockdata : {
    
    data:undefined  
  }
}