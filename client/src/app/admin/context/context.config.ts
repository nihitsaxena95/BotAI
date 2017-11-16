export const testConfig = {
  mockResponseSC : {
    status:true,
    result: {
      fields: [{
        labels:["Domain"],
        properties:{name: "about"}
      }]
    }
  },
  mockResponseGC : {
    fields: [{         
      labels:["SubDomain"],
      properties:{name: "retirement plan"}
    }]
  } ,

  res:
  {
    status:true

  },

  mocked:[{
    _fields:[{
      properties:{                
        name: "profit sharing"
      }
    }]
  }

  ],
  mockk:{
    _fields:[{
      properties:{                
        name: "profit sharing"
      }
    }]
  },

  response :[{
    _fields:[{
      properties:{                
        name: "employer match"
      }
    }]
  }

  ],

  responses:{
    _fields:[{
      properties:{                
        name: "employer match"
      }
    }]
  },
  data : [{
    link:""
  }],
  dataremove : [],

  mockResponse:{
    id: 3, 
    label: "Attriute", 
    itemName: "individual"
  },

  mockResponse1:{
    id: 1, 
    itemName: "type", 
    name: "type", priority: "2"
  }

}