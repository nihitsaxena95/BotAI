let demo=require('../../model/questionbank_schema');

export default (questions) => {
 let data1 = {"question" : questions};
 demo.update({},{$addToSet : {questions:data1}},{upsert:true},(err,data)=>{
   if(err)
   {
      res.json({status:false,data:null});
     }
     else{
 }
})
}