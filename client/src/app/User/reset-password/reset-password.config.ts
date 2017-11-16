/*---------------Stubbed data for testing------------------*/
export const testConfig={
	stubdataResetSucc : {
    status : "true",
    message : "Successfully Changed",
    data:{ok: 1, nModified: 1, n: 1}
   },
   stubdataResetUnsuccE : {
      status : "false",
      message : "All fields not filled"
    },
    stubdataResetUnsuccU : {
      status : "true",
      message : "Passwords did not match"
    },
     stubdataResetUnsuccN : {
      status : "false",
      message : "Old Password did not match",
      data:null
    },
  userdataResetSucc:{
    name: "Demo", 
    username: "Demo", 
    contact_no: 9432349872, 
    email: "demo@gmail.com"
  },
  userdataResetUnsucc:{
      name: "Demo", username: "Demo", contact_no: 9432349872, email: "demo@gmail.com"
    },
  Comoldpas: "naman",
  Comonewpas: "1234",
  ComoConfpasSucc: "1234",
  ComoConfpasUnsuccU: "12345",
  ComoConfpasUnsuccN: "1234",
  resSucc:{
    status : "true",
    message : "Successfully Changed",
    data:{ok: 1, nModified: 1, n: 1}
  },
  resUnsuccE:{
    status : "false",
    message:"All fields not filled"
  },
  resUnsuccU:{
    message : "Passwords didnot match"
  },
  resUnsuccN:{
    status:false,
    message:"Old Password didnot match",
    data : null
  },

  mockresPos:{
    status:true,
    message : "Success", 
    data:{ok: 1, nModified: 1,n: 1}
  },
  mockresNeg:{
    status:false,
    message : "failed", 
    data:{ok: 0, nModified: 0, n: 0}
  },
  data:{
    email:"demo@gmail.com",
    data:{ok: 1, nModified: 1, n: 1}
  },
  password:{
    oldpassword:"Naman",
    newpassword:"1234"
  },
  Succmsg:"Success"

}