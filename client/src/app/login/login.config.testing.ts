export const testConfig={
	res:{
		status: false, message: "Authentication failed. Wrong passwo…", userdata: null
	},

	mockResponse :{
		status :true,
		message : "success",
		userdata : {
			confirmPassword:"Shivam@123",
			contactNo:"8922861748",
			email:"stshivam@gmail.com",
			name:"chandra",
			password:"Shivam@123",
			username:"chandra7"
		}
	},

	mmockResponse :{
		status :true,
		message : "success",
		userdata : {
			confirmPassword:"Shivam@123",
			contactNo:"8922861748",
			email:"stshivam@gmail.com",
			name:"chandra",
			password:"Shivam@123",
			username:"chandra7"
		}
	},

	Response : {
		status :false,
		message : "success",
		userdata : {
			status:false,
			contactNo:"8922861748",
			email:"stshivam@gmail.com",
			name:"chandra",
			password:"Shivam@123",
			username:"chandra7"
		}
	},

	loginMock:{
				email : "nihitsaxena95@gmail.com",
				password : "jasmine9"
			},

			resultData:{
      status: true,
      message: "Success",
      token: 'bearer 1234',
      data : {
        status:true,
        type :"Admin"
      }
    },

    response:{
      status: false,
      message: "Success",
      token: 'bearer 1234',
      userdata : {
        status:false,
        type :"User"
      }
    },
    resdata :{
      status: true,
      message: "Success",
      token: 'bearer 1234',
      data : {
        status:true,
        type :"User"
      }
    },
    loginComp :{
    	email:"stshivamtripathi@gmail.com",
    	password:"shivam@123",
    }
}


/*---------Stub class for RouteStub for tseting activated routes--------*/ 
export class RouteStub {
	navigateByUrl(url:string) {return url;}
};