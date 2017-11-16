export const testConfig={
  res:{
    status:true,
    message:"success",
    data:[{
      _fields:[{
        properties:{
          name:"about"
        }
      }]
    }]
  },
  data: {
    status:true,
    message:"success",
    intent:"about"
  },
  datastub:{
    status:true,
    message:"Synonym Found",
    data:["…chusetts","Bay_State","Old_Colony","MA","Mass."]
  },
  mockResponse:
  {
    data:["…chusetts","Bay_State","Old_Colony","MA","Mass."]
  },
  stub:{
    status:true,
    message:"Synonym Found",
    data:["Bay_State","Old_Colony","MA","Mass."]
  },
  mockResponseAddAdminSynonymNeg : {
    keys: ["m"], 
    length: 1, 
    _fields:[
    {
      identity: {low: 759, high: 0}, 
      labels: [], 
      properties: {name: "jhxvzdj"}
    }
    ], 
    _fieldLookup: {m:0}
  },
  mockResponseAddAdminSynonymPos : {
    keys: ["m"], 
    length: 1, 
    _fields:[
    {
      identity: {low: 759, high: 0}, 
      labels: ["Synonym"], 
      properties: {name: "jhxvzdj"}
    }
    ], 
    _fieldLookup: {m:0}
  },
  addmore:{
    _fields:[{
      labels:["Synonym"],
      properties:{name: "me"}
    }
    ]
  },
  mockResponsesetSynonymNeg : {
    status: false, 
    message: "data found",
    data: [
    {
      keys: ["n", "k"], 
      length: 2,
      _fields: [{
        identity: {low: 655, high: 0},
        labels: [], 
        properties: {
          name: "about",
          priority: "7"}
        }],
        _fieldLookup: {n: 0, k: 1}
      }
      ]
    },
    mockResponsegetContextNeg : [{keys: Array(1),
      length: 1,
      _fields: [
      {
        identity: {low: 713, high: 0},
        labels: [], 
        properties: {name: "retirement plan"}
      }
      ],
      _fieldLookup: {n: 0}
    }
    ],
    mockResponsegetContextPos : [{keys: Array(1),
      length: 1,
      _fields: [
      {
        identity: {low: 713, high: 0},
        labels: ["Domain"], 
        properties: {name: "retirement plan"}
      }
      ],
      _fieldLookup: {n: 0}
    }
    ],
    mockResponsesetSynonymPos : {
      status: true, 
      message: "data found",
      data: [
      {
        keys: ["n", "k"], 
        length: 2,
        _fields: [{
          identity: {low: 655, high: 0},
          labels: ["Intent"], 
          properties: {
            name: "about",
            priority: "7"}
          }],
          _fieldLookup: {n: 0, k: 1}
        }
        ]
      },
      addata:{
        synonymname:"me",
        intentName:"could"
      },
      delete:{
        data:{
          summary:{
            updateStatistics:{
              _stats:{
                nodesCreated: 0,
                nodesDeleted: 1,
                relationshipsCreated: 0,
                relationshipsDeleted: 1,
                propertiesSet: 0
              }
            }
          }
        }
      }
      ,

      intentsetSynonym:"Intent",

      deldata:{
        label:"Intent",
        itemName:"about",
      },
      addsyno:{
        label:"Intent",
        labelname:"about",
        syn:["what"]
      },
      negmock:{
        label:"Intent",
        labelname:"about",
        syn:["what"]
      },
      negdata:{
        label:"Intent",
        labelname:"abo",
        syn:["wat"]
      },
      delsyno:{
        status:"ok"
      },
      del:{
        synonymname:"tell me",
        intentname:{ 
          itemName:"about",
          label:"Intent"
        }
      },
      mockResponseIntentPositive : [
      {keys: ["n"],
      length: 1,
      _fields:[
      {identity:
        {low: 138, high: 0},
        labels: ["Intent"],
        properties: {name: "Verification", priority: "10"}}], _fieldLookup: {n: 0}
      }
      ],
      mockResponseIntentNegative : [
      {keys: ["n"],
      length: 0,
      _fields:[
      {identity:
        {},
        labels: [],
        properties: {}}], _fieldLookup: {n: 0}
      }
      ],

      quesdeletependingques:"Tell me about Retirement Plan",
      datadeletependingques:{ok: 1, nModified: 1, n: 1},
      questionsendques:"what is policy",
      datasendques:[{ok: 1, nModified: 1, n: 1}],
      questionaddIntent:"what is policy",
      itemaddIntentpos:{status: true, message: "success",data:{keys: Array(1), length: 1, _fields: [{labels:["Intent"],properties:{name: "llklk", priority: "11"}}]}},
      itemaddIntentneg:{status: true, message: "success",data:{keys: Array(1), length: 1, _fields: [{labels:["Intent"],properties:{name: "llklk", priority: "11"}}]}},
      datadeletesynonym:"What",
      valuedeletesynonym:{status: true, message: "Successfully Deleted"},
      intentnamedeletesynonym:{id: 1, label: "Intent", itemName: "about", priority: "3"},
      quesgetQues:"what is retirement plan ?",
      datagetQues:[{word: "retirement plan", type: "SubDomain", typename: "retirement plan"}],
      datagetQuesneg:[{word: "retirement plan", type: "SubDomain"}],
      getunanswerData : [{questions:[{question:"what is hello?"}]}],
      dataRelatedEntity : {id: 1, label: "Intent", itemName: "Verification", priority: "10"},
      mockResponseRelatedPositive : ["assertion", "verify"],
      mockResponseRelatedNegative : [],
      dataAddSynonym :  {label: "Intent", labelname: "welcome", syn: ['hello','hi','hey']} ,
      mockResponseAddSynonym : {status: true, message: "Relationship Created"} ,
      mockResponseAddSynonymNegative : {status: false, message: "Not Created"},
      deleteIntentData : {id: 3, label: "Intent", itemName: "test", priority: "21"},
      deleteIntentResponse : {records: Array(0), summary: {statement: {text: "MATCH (a:Intent {name:'test'}) detach delete a"}, statementType: "w"}},
      suggestData : ["kind", "tolerant"],
      suggestKind : "kind",
      suggestTol : "tolerant"
    }