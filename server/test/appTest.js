let supertest = require('supertest');
let express = require('express');
let sinon = require('sinon');
let should=require('chai').should();
let expect = require('chai').expect;
let assert = require('chai').assert;
let app = require('../app').default;
import jwt from 'jsonwebtoken';
import passport from 'passport';
let testconfig = require('./test-config');
import register_model from '../model/register_schema';
import add_taskmodel from '../model/add_task';
import questionbank_model from '../model/questionbank_schema';
import flow_schema from '../model/flow_schema';

let unanswerQuesFind = sinon.stub(questionbank_model,'find');
let adminquesUpdate = sinon.stub(questionbank_model,'update');
let registerCount = sinon.stub(register_model, 'count');
let registerFind = sinon.stub(register_model, 'find');
let registerRemove = sinon.stub(register_model, 'remove');
let registerUpdate = sinon.stub(register_model, 'update');
let registerUpdateOne = sinon.stub(register_model, 'updateOne');
let registerFindOne = sinon.stub(register_model,'findOne');
let url=supertest(app);
let addtaskUpdate = sinon.stub(add_taskmodel, 'update');
let flowschemafind = sinon.stub(flow_schema, 'find');
let flowschemafindOne = sinon.stub(flow_schema, 'findOne');
let flowschemainsert = sinon.stub(flow_schema,'insertMany');
let jwtToken;


/*=============================Start of Positive test for verify user=============================*/
describe('verify_user processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerFind.yields(null,[testconfig.verifyuser.findyield])
registerUpdate.yields(null,[testconfig.verifyuser.updateyield])
});
  registerFind.yields(null,[testconfig.verifyuser.findyield2])

  it('Update must be a success positive',(done)=>{
    url
    .get('/verify_user/:59c393d31f0a19213741e83e')
    .set('Authorization', 'bearer' +jwtToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.data==null){
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
});
//=============================End of Positive test for verify user=============================

/*=============================Start of Negative test for verify user=============================*/
describe('verify_user processed here',()=>{
  before(()=>{
 //yield is used to stub the info required by database
 registerFind.yields(null,null)
});

  it('Update must be a success negative',(done)=>{
    url
    .get('/verify_user/59c393d31f0a19213741e83e')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.data== null)
      {
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
});
/*=============================End of Negative test for verify user=============================*/

/*=============================start of Positive  Testing forgot_password============================*/

describe('forgot processed here empty find',()=>{  

  before(()=>{
 //yield is used to stub the info required by database
 registerFind.yields(null,null)
 registerUpdate.yields(null,testconfig.forgotpassword.updateyield)
});
  it('Update must be a success',(done)=>{
    url
    .post('/forgot_password')
   //.set('Authorization', 'bearer' +jwtToken).expect(200)
   .expect('Content-Type', /json/)
   .send(testconfig.forgotpassword.findyield)
   .end((err,res)=>{
    if(err){
      return err;
    }
    else{
      assert.equal(res.body.status,undefined);
      done();
    };
  });
 });
});
/*=============================end of Positive  Testing forgot_password============================*/

/*=============================start of Negative  Testing forgot_password============================*/

describe('forgot processed here empty update',()=>{  
  before(()=>{ 
 //yield is used to stub the info required by database
 registerFind.yields(null,[testconfig.forgotpassword.findyield]);
 registerUpdate.yields(null,null);
});
  it('Update must be a success',(done)=>{
    url
    .post('/forgot_password')
    .set('Authorization', 'bearer' +jwtToken).expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.forgotpassword.findyield)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else{     
        assert.equal(res.body.status,false);
        done();
      };
    });
  });
});
/*=============================end of Negative  Testing forgot_password============================*/

/*================================start Testing of warning_page===================================*/

/*================================start positive testing of warning_page ============================*/
describe('warning_page processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerFind.yields(null,null)
});
  it('Update must be a success',(done)=>{
    url
    .get('/warning_page/:59c393d31f0a19213741e83e')
    .set('Authorization', 'bearer' +jwtToken).expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      } 
      else if(res.body.data== null)
      {
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
});
/*================================end negative testing of warning_page ============================*/
/*=============================Start of Positive test for warning page=============================*/
describe('warning_page processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerFind.yields(null,[testconfig.warningfindresponse])
registerUpdate.yields(null,[testconfig.warningUpdateresponse])
});
  registerFind.yields(null,[testconfig.warningfindresponse])
  it('Update must be a success',(done)=>{
    url
    .get('/warning_page/:59c393d31f0a19213741e83e')
    .set('Authorization', 'bearer' +jwtToken).expect(200)
    .expect('Content-Type', /json/)
    .send()
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.data==null){
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
  it('Update must be a success negative',(done)=>{
    url
    .get('/verify_user/59c393d31f0a19213741e83e')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.data== null)
      {
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
});
/*=============================End of Negative test for verify user=============================*/
/*=============================end of Positive test for warning page=============================*/
/*================================end Testing of warning_page===================================*/
/*=============================Start of Negative test for set_password method =============================*/

describe('set_password processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerFind.yields(null,null)
});
  it('find negative must be a success',(done)=>{
    url
    .put('/set_password/abc/122')
    .set('Authorization', 'bearer' +jwtToken).expect(200)
    .send()
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      } 
      else if (res.body.data==undefined){
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
});
/*=============================End of Negative test for set_password method=============================*/

//====================================loginTest=============================================*/

//================start of negative Signin if data is not available in database===============*/
describe('Signin processed here',()=>{
  before(() => {
    registerFindOne.yields(null, null);
  });

  it('signin must fail', ()=> {
    let token = "some token";
    url
    .post('/login')
    .send(testconfig.signin.sendyield)
  //.set('Authorization').expect(200)
  .end((err,res) => {
    if(err) {

      return done(err);
    }

  })
});
});

//*===========End of negative Signin if data is not available in database=============*/


//=======start of positive Signin if data is available but email is wrong==========*/
describe('Signin data processed here',() => {
  before(() => {
    registerFindOne.yields(null, [testconfig.signin.findyield]);
  })

  it('signin must work',() => {
    url
    .post('/login')
    .send(testconfig.signin.sendyield)
  //.set('Authorization').expect(200)
  .end((err,res) => {
    if(err) {
      return done(err);
    }

  })
});
});
//======end of positiveSignin if data is available but email is wrong===========*/


/*===========================force logout =======================================*/

// =======================positive testing of force logout =====================
describe('forcelogout positive data processed here',() => {

  let logout=testconfig.forcelogout.logout;
  before(() => {
    if(logout.email!=null){
      registerUpdateOne.yields(null, [testconfig.forcelogout.updateyield]);
    }
    else{
      registerUpdateOne.yields(null, undefined);
    }
  })

  it('forcelogout must work',(done) => {
    url
    .put('/forcelogout')
    .send(testconfig.forcelogout.send)
  //.set('Authorization').expect(200)
  .end((err,res) => {
    if(err) {
      return done(err);
    }
    else{
      assert.equal(res.body.status, true)
      done()
    }

  })
});
});
/*======================end of positive testing force logout =================*/
/*=======================negative testing of force logout =====================*/
describe('forcelogout negative data processed here',() => {
  let logout=null
  before(() => {
    if(logout!=null){
      registerUpdateOne.yields(null, [testconfig.forcelogout.updateyield]);
    }
    else{
      registerUpdateOne.yields(null, undefined);
    }
  })

  it('forcelogout must work',(done) => {
    url
    .put('/forcelogout')
    .send()
  //.set('Authorization').expect(200)
  .end((err,res) => {
    if(err) {
      return done(err);
    }
    else{
      assert.equal(res.body.status, false)
      done()
    }
  })
});
});
/*======================end of negative testing force logout =================*/
/*===========================end of force logout=================================*/

/*================Start of Test for addtask================*/
/*================Start of positive test for addtask================*/
describe('Method post success positive test for addtask', (done)=>{
  before(()=>{
 //yield is used to stub the info required by database
 addtaskUpdate.yields(null,[testconfig.addtask.updateyield]);
});
  it('update must be a success',(done)=>{
    url
    .post('/addtask')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.addtask.send)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else {
        assert.equal(res.body.status,true);   
        done();
      }
    });
  });
});
/*================End of positive test for addtask================*/
/*================Start of negative test for addtask================*/
describe('Method post success negative test for addtask', (done)=>{
  before(()=>{
 //yield is used to stub the info required by database
 addtaskUpdate.yields(null,null);
});
  it('update must be a success',(done)=>{
    url
    .post('/addtask')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.addtask.send)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.data==undefined){
        assert.equal(res.body.status,false);   
        done();
      }
    });
  });
});
/*================End of negative test for addtask================*/
/*================End of Test for addtask================*/



// =====================start of ques_ans.js======================

/*======================start of positive testing ================*/

describe('Method of update ques_ans positive processed here',()=>{

  let question=testconfig.ques.data
  let questions=[];
  questions.push(question)
  before(()=>{
//yield is used to stub the info required by database
registerUpdate.yields(null,questions)
registerFind.yields(null,testconfig.ques.findyield.data)
});
  it('update must be a success',(done)=>{
    url
    .post('/ques_ans')
    .expect('Content-Type', /json/)
    .send(testconfig.ques.data)
    .end((err,res)=>{
      if(err){
        return err;
      } 
      else {
       assert.equal(res.body.status,true);
       done();
     };
   });
  });
});

/*======================end of positive testing======================*/

/*=======================start of negative testing====================*/

describe('Method of update ques_ans negative processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerUpdate.yields(null,null)
});
  it('update must be a success',(done)=>{
    url
    .post('/ques_ans')
    .expect('Content-Type', /json/)
    .send()
    .end((err,res)=>{
      if(err){
        return err;
      } 
      else {
        assert.equal(res.body.data,null);
        done();
      };
    });
  });
});


/*========================end of negative testing=======================*/

/*======================end of ques_ans.js=============================*/

/*=============================Start of Positive test for unanswerques=============================*/
describe('unanswerques processed here',()=>{
  let questions=[];
  let question=testconfig.unanswerques.question;
  questions.push(question)
  before(()=>{
 //yield is used to stub the info required by database
 unanswerQuesFind.yields(null,questions)
});
  it('Find must be a success Positive',(done)=>{
    url
    .get('/unques')
    .expect(200)
    .send({question:"what is investment"})
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else{       
        assert.equal(res.body[0].question,'what is investment');
        done();
      }
    });
  });
});
/*=============================End of Positive test for unanswerques=============================*/
/*=============================Start of Negative test for unanswerques null=============================*/
describe('unanswerques processed here',()=>{
  let questions=[];
  let question={question:null};
  questions.push(question)
  before(()=>{
 //yield is used to stub the info required by database
 unanswerQuesFind.yields(null,questions)
});
  it('Find must be a success Positive',(done)=>{
    url
    .get('/unques')
    .expect(200)
    .send({question:"what is investment"})
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else 
      {
        assert.equal(res.body[0].question,null);
        done();
      }

    });
  });
});
/*=============================End of Negative test for unanswerques null=============================*/
/*=============================Start of positive test for adminques postUpdate=============================*/
describe('Method post success positive test for adminques', (done)=>{
  let question=testconfig.adminques.question;
  let questions=[];
  questions.push(question)
  before(()=>{
    if(questions[0].question!=null){
 //yield is used to stub the info required by database
 adminquesUpdate.yields(null,[testconfig.adminques.if]);
}
else{
  adminquesUpdate.yields(null,[testconfig.adminques.else]);
}
});
  it('update must be a success',(done)=>{
    url
    .post('/unques')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(questions)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else {
        assert.equal(res.body.data[0].ok,1);   
        done();
      }
    });
  });
});
/*=============================End of positive test for adminques postUpdate=============================*/
/*=============================Start of negative test for adminques postUpdate=============================*/
describe('Method post success negative test for adminques', (done)=>{
  let question={question:null};
  let questions=[];
  questions.push(question)
  before(()=>{
    if(questions[0].question!=null){
 //yield is used to stub the info required by database
 adminquesUpdate.yields(null,[testconfig.adminques.if]);
}
else{
  adminquesUpdate.yields(null,[testconfig.adminques.else]);
}
});
  it('update must be a success',(done)=>{
    url
    .post('/unques')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(question)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else {
        assert.equal(res.body.data[0].ok,0);   
        done();
      }
    });
  });
});

/*=============================Start of Positive test for followup=============================*/
describe(' Positive test for followup processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
flowschemafind.yields(null,[testconfig.followup.findyield])
});

  it('Find must be a success positive',(done)=>{
    url
    .post('/followup/selectfollow')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.followup.send)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else{
        assert.equal(res.body.genre,'Introduction');
        done();
      };
    });
  });
});
/*=============================End of Positive test for followup=============================*/

/*=============================Start of Neagtive test for followup=============================*/
describe(' Neagtive test for followup processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
flowschemafind.yields(null,[])
});

  it('Find must be a success positive',(done)=>{
    url
    .post('/followup/selectfollow')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.followup.send)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.data==undefined){
        assert.equal(res.body.status,false);
        done();
      };
    });
  });
});
// =============================End of Neagtive test for followup=============================

/*=============================Start of Positive test for getfollow=============================*/
describe(' Positive test for getfollow processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
flowschemafind.yields(null,[testconfig.getfollow.findyield])
});
  it('Find must be a success positive',(done)=>{
    url
    .get('/followup')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else{
        assert.equal(res.body[0].task,"Mutual Funds task");
        done();
      };
    });
  });
});
/*=============================End of Positive test for getfollow=============================*/
/*=============================Start of Negative test for getfollow=============================*/
describe(' Negative test for getfollow processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
flowschemafind.yields(null,[])
});

  it('Find must be a success',(done)=>{
    url
    .get('/followup')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body[0]==undefined){
        assert.equal(res.body[0],null);
        done();
      };
    });
  });
});
/*=============================End of Negative test for getfollow=============================*/
/*=============================Start of positive test for setflow=============================*/
describe(' positive test for setflow processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
flowschemainsert.yields(null,[testconfig.setflow.insertyield])
});

  it('Find must be a success',(done)=>{
    url
    .post('/followup')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.setflow.send)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else {
        assert.equal(res.body.status,true);
        done();
      };
    });
  });
});
/*=============================End of positive test for setflow=============================*/
/*=============================Start of Negative test for setflow=============================*/
describe('Negative test for setflow processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
flowschemainsert.yields(null,null)
});

  it('Find must be a success',(done)=>{
    url
    .post('/followup')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(testconfig.setflow.send)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body.status==false){
        assert.equal(res.body.status,false);
        done();
      };
    });
  });
});
/*=============================End of Negative test for setflow=============================*/

/*------------------------------------Start nextfollowUp here-------------------------------------------*/
/*================================Start Negative nextFollowup===========================================*/
describe("negative questionType 0",() => {

//{question:{type:'q'}}

beforeEach(() => {
  flowschemafind.yields(null, [testconfig.nextfollowup.findyield]);
})
it("Response check for questionType 0" , (done) => {
  url
  .put('/followup')
  .expect(200)
  .expect('Content-Type', /json/)
  .send(testconfig.nextfollowup.send)
  .end((err,res) => {   
    if(err) {
      return  done(err);
    } else {
      assert.equal(res.body, '')
      done();
    }
  })
})
});
/*=================================End Negative nextFollowup========================================*/

/*================================Start Positive nextFollowup===========================================*/
describe("positive questionType 0",() => {

//{question:{type:'q'}}

beforeEach(() => {
  flowschemafind.yields(null, [testconfig.nextfollowup.findyield]);
})
it("Response check for questionType 0" , (done) => {
  url
  .put('/followup')
  .expect(200)
  .expect('Content-Type', /json/)
  .send(testconfig.nextfollowup.send)
  .end((err,res) => {           
    if(err) {             
      return  done(err);
    } else {
      assert.equal(res.body, '')
      done();
    }
  })
})
});
/*=================================End Positive nextFollowup========================================*/

/*=======Positive test case for followup getdata============*/
describe('followUp getData data processed here',() => {
 before(() => {
   flowschemafindOne.yields(null, [testconfig.getdata.findyield]);
 })
 it('getData must work',() => {
   url
   .get('/followup/getdata/:ishan')
   .expect(200)
   .end((err,res) => {
     if(err) {
       return done(err);
     }
     else{
       assert.equal(res.body[0].name,"ishan")
     }
   })
 });
});
/*=======End Positive test case for followup getdata============*/

/*Start of updateUesrdata*/
/*=======Start of Positive test case for updateUesrdata============*/
describe('Method of updateUserdata positive processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerUpdate.yields(null,testconfig.updateuserdata.updateyield)
});
  it('update must be a success',(done)=>{
    url
    .put('/updateUserdata')
    .expect('Content-Type', /json/)
    .send(testconfig.updateuserdata.send)
    .end((err,res)=>{
      if(err){
        return err;
      } 
      else {
        assert.equal(res.body.status,true);
        done();
      };
    });
  });
});
/*=======End of Positive test case for updateUesrdata============*/
/*=======Start of Negative test case for updateUesrdata============*/
describe('Method of updateUserdata negative processed here',()=>{
  before(()=>{
//yield is used to stub the info required by database
registerUpdate.yields(null,null)
});
  it('update must be a success',(done)=>{
    url
    .put('/updateUserdata')
    .expect('Content-Type', /json/)
    .send(testconfig.updateuserdata.send)
    .end((err,res)=>{
      if(err){
        return err;
      } 
      else {
        assert.equal(res.body.status,false);
        done();
      };
    });
  });
});
/*=======End of Negative test case for updateUesrdata============*/
/*End of updateUserdata*/

//========start of reset password==========//
/*=======Start of positive test case for match resetpassword========*/
describe('Reset Password user here',()=>{ 
before(()=>{ 
//yield is used to stub the info required by database
registerFind.yields(null,[testconfig.resetpassword.positiveMatchfind])
registerUpdate.yields(null,[testconfig.resetpassword.positiveMatchupdate])
});
it('reset password must be a success',(done)=>{
 
url
  .put('/reset_password/shagunsankla61@gmail.com')
  .expect(200)
  .send(testconfig.resetpassword.findyield)
  .end((err,res)=>{
    if(err){ 
      return err
    }
      else{
     assert.equal(res.body.status,false);
   done();
}
});
});
});
/*=======End of positive test case for match resetpassword========*/
/*=======Start of positive test case for match old pass not match resetpassword========*/
describe('Reset Password old password not match user here',()=>{
 
before(()=>{
 
//yield is used to stub the info required by database
registerFind.yields(null,[testconfig.resetpassword.positiveNomatchfind])
//registerUpdate.yields(null,[{status:true, message : "oldpassword do not match",data:[]}])
});
it('reset password must be a success',(done)=>{
 
url
  .put('/reset_password/shagunsankla61@gmail.com')
  .expect(200)
  .send(testconfig.resetpassword.positiveNomatchsend)
  .end((err,res)=>{
    if(err){
      return err;
    }
      else{
      
    assert.equal(res.body.status,false);
   done();
}
});
});
});
/*=======end of positive test case for oldpass dont match resetpassword========*/
/*=======Start of negative test case for email dont match resetpassword========*/
describe('Reset Password email donot match user here',()=>{
 
before(()=>{
//yield is used to stub the info required by database
registerFind.yields(null,null)
//registerUpdate.yields(null,[{status:true, message : "oldpassword do not match",data:[]}])
});
it('reset password  donot must be a success',(done)=>{
 
url
  .put('/reset_password/shagunsankla61@gmail.com')
  .set('Authorization', 'bearer' +jwtToken).expect(200)
  .expect('Content-Type', /json/)
  .send(testconfig.resetpassword.negativeEmailnomatchsend)
  .end((err,res)=>{
    if(err){
      return err;
    }
      else{
      
     assert.equal(res.body.status,false);
   done();
}
});
});
});
/*=======end of negative test case for email dont match resetpassword========*/
/*=======Start of negative test case for email dont match resetpassword========*/
describe('Reset Password email donot match user here',()=>{
 
before(()=>{
 
//yield is used to stub the info required by database
registerFind.yields(null,null)
//registerUpdate.yields(null,null)
});
it('reset password  donot must be a success',(done)=>{
 
url
  .put('/reset_password/shagunsankla61@gmail.com')
  .set('Authorization', 'bearer' +jwtToken).expect(200)
  .expect('Content-Type', /json/)
  .send(testconfig.resetpassword.negativeEmaildontmatchsend)
  .end((err,res)=>{
    if(err){
      return err;
    }
      else if(res.body.data2==undefined){
            assert.equal(res.body.data2,undefined);
   done();
}
});
});
});
//=================reset password ====================//


/*=======Start of positive test case for getUnAnswerCount========*/

   describe('Start of positive test case for getUnAnswerCount',()=>{
 
before(()=>{
//yield is used to stub the info required by database
unanswerQuesFind.yields(null,[testconfig.uNanswerquesCount])
//registerUpdate.yields(null,[{status:true, message : "oldpassword do not match",data:[]}])
});
it('positive test case for getUnAnswerCount',(done)=>{
 
url
  .get('/counts/getUnanswerCount')
  //.set('Authorization', 'bearer' +jwtToken).expect(200)
  .expect('Content-Type', /json/)
  .send(testconfig.uNanswerquesCount)
  .end((err,res)=>{
    if(err){
      return err;
    }
      else{
      

     assert.equal(res.body.unansCount,1);
   done();
}
});
});
});

/*=======End of positive test case for getUnAnswerCount========*/


/*=======Start of negative test case for getUnAnswerCount========*/

   describe('Start of negative test case for getUnAnswerCountNegative',()=>{
 
before(()=>{
//yield is used to stub the info required by database
unanswerQuesFind.yields(null,[null])
//registerUpdate.yields(null,[{status:true, message : "oldpassword do not match",data:[]}])
});
it('negative test case for getUnAnswerCountNegative',(done)=>{
 
url
  .get('/counts/getUnanswerCount')
  //.set('Authorization', 'bearer' +jwtToken).expect(200)
  .expect('Content-Type', /json/)
  .send(testconfig.uNanswerquesCountNegative)
  .end((err,res)=>{
    if(err){
      return err;
    }
      else{
      
   
     assert.equal(res.body.unansCount,null);
   done();
}
});
});
});


/*=======End of negative test case for getUnAnswerCount========*/