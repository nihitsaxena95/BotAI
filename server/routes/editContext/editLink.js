let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import staticConfig from './Config';
import config from '../../config/config';
import logger from '../../log4js';
import editFlow from './editflow';

const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default  (req, res)=> {
  let intent=[];
  let video = staticConfig.video.video;
  let link = staticConfig.link.link;
  let completeContext = req.body.completeContext;
  let context = req.body.context;

  completeContext.map((con) => {
    
    let videoLink=[];
    
    let blogLink=[];
    
    let vid;
    let blog;
    if(con.videoLink != undefined)
    {
     con.videoLink.map(video => {
       
       videoLink.push(video);
     })
   }

   if(con.blogLink != undefined)
   {
     
     con.blogLink.map(blog => {
      
       blogLink.push(blog);
       
     })
   }

   editFlow(completeContext,context);
   if((videoLink.length!=0||videoLink.length==0)&&(blogLink.length!=0||blogLink.length==0)&&(con.value!=undefined))
   {
     const resultPromise = session.run(
       'match (a:'+context.label+' {name:"'+context.itemName+'"})-[:'+con.name+']->(b:Attribute {name:"'+con.name+'"})  Set b.value="'+con.value+'" '

       );
     resultPromise.then((result)=>{

      intent.push(result.records)

    })


     /*=============Querry for video link==============*/				

     videoLink.map((vid)=>{

      if( (vid.id!=undefined)&&(vid.value!="")&&(vid.delete==false))
      {

        const resultPromise = session.run(
         'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[:answer]->(p:Video) where ID(p)='+vid.id+' Set p.value="'+vid.value+'" return p'
         );
        resultPromise.then((result)=>{
         intent.push(result.records)

       })
      }
      else if( (vid.id!=undefined)&&(vid.value==""||vid.value!="")&&(vid.delete==true) )
      {

        const resultPromise = session.run(
          'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[ans:answer]->(p:Video) where ID(p)='+vid.id+' detach delete ans,p'
          );
        resultPromise.then((result)=>{
          intent.push(result.records)
        })
      }
       /* else if( (vid.id==undefined)&&(vid.value==""||vid.value!="")&&(vid.delete==true||vid.delete==false))
       {*/
          //Nothing will happen here
          /*}*/
          else if ( (vid.value!="")&&(vid.delete==false) ){

            const resultPromise = session.run(
             'match (a:'+context.label+' {name:"'+context.itemName+'"})-[:'+con.name+']->(b:Attribute {name:"'+con.name+'"}) merge (b)-[:answer]->(d:'+video+'{name:"'+vid.name+'", value:"'+vid.value+'"}) return b,d'
             );
            resultPromise.then((result)=>{
              intent.push(result.records)
            })
          }



        });



     blogLink.map((blog)=>{


      /*=============Querry for blog link==============*/
      if( (blog.id!=undefined)&&(blog.value!="")&&(blog.delete==false))
      {

        const resultPromise = session.run(
         'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[:answer]->(p:'+link+') where ID(p)='+blog.id+' Set p.value="'+blog.value+'" return p'
         );
        resultPromise.then((result)=>{
         intent.push(result.records)
       })

      }
      else if( (blog.id!=undefined)&&(blog.value==""||blog.value!="")&&(blog.delete==true) )
      {

       const resultPromise = session.run(
        'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[ans:answer]->(p:'+link+') where ID(p)='+blog.id+' detach delete ans,p'
        );
       resultPromise.then((result)=>{
         intent.push(result.records)
       })


     }
      /*  else if( (blog.id==undefined)&&(blog.value==""||blog.value!="")&&(vid.delete==true||blog.delete==false))
        {
          // Nothing will happen here
        }*/
        else if ( (blog.value!="")&&(blog.delete==false) ){

         const resultPromise = session.run(
          'Match (a:'+context.label+' {name:"'+context.itemName+'"})-[:'+con.name+']->(b:Attribute {name:"'+con.name+'"}) merge (b)-[:answer]->(d:'+link+'{name:"'+blog.name+'", value:"'+blog.value+'"}) return b, d'
          );
         resultPromise.then((result)=>{
           intent.push(result.records)
         }); 

       }



     });
     res.json(intent)   

   }
 })
}