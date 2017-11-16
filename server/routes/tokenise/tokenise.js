import express from 'express'; // File for messages
import logger from '../../log4js';
import tokenizer from 'sbd';
import natural from 'natural';
import pos from 'pos';
import sw from 'stopword';
import Typo from 'typo-js';
import gingerbread from 'gingerbread';
import numerizer from 'numerizer';
import sentiment from 'sentiment';
import lang from '../../util';
import user from '../../model/register_schema';
import staticConfig  from './Config';

let dictionary = new Typo('en_US');

export default (req,res) => {
  try{
    let stem=[];
    let wordData=[];
    let posData = [];
    let token = new natural.WordTokenizer();
    let stopword=[];
    let withStopword=[];
    let posWord=[];
    let intent=[];
    let messageOrder = req.body.message;
    /*numerizer*/
    messageOrder = numerizer(messageOrder);
    
    /*Spell Check*/
    gingerbread(messageOrder,(error,text,result,corrections)=>{
      messageOrder = result;
      call();
    });

    function call(){
     /*sentence normalizer*/
     messageOrder = lang.replace.all(messageOrder);
     
     /*Sentiment*/
     let emotion = sentiment(messageOrder);
     
     if(emotion.score < 0) {
      user.findOne({'email' : req.body.email}, (err,data) => {
        if(err){  // error handle here          
      logger.info(staticConfig.tokenise.Error);            // making logs
          res.json({message:staticConfig.tokenise.Error}); // response to client
        }
        else {
          if(data.badCount < 3) {
            user.updateOne({'email' : req.body.email }, {$inc : {badCount : 1}},(err, data) => {
              if(err) {
                logger.info(staticConfig.tokenise.Error);            // making logs
                res.json({status:true,message : staticConfig.tokenise.Error, userdata : null}) 
              }
              else {
                logger.info(staticConfig.tokenise.BadWord);            // making logs
                res.json({status : false, message:staticConfig.tokenise.BadWord})
              }
            })
          }
          else {
            logger.info(staticConfig.tokenise.BadCount);            // making logs
            res.json({status : false, message : staticConfig.tokenise.BadCount})
          }
        }
      });
    }
    else{
      /*breakng multiple sentences*/
      let optional_options = {
       "newline_boundaries" : false,
       "html_boundaries"    : false,
       "sanitize"           : false,
       "allowed_tags"       : false,
       "abbreviations"      : null
     };
     
     messageOrder = messageOrder.toLowerCase();
     let sentences = tokenizer.sentences(messageOrder, optional_options);
     /*Seprating each word*/
     let tokenData = [];
     let pushed = {
       data : ""
     }
     sentences.map((sentence)=> {
       pushed.data = token.tokenize(sentence);
       tokenData.push(pushed);
       pushed = {
         data : ""
       }
     })

     /*removing stop words*/
     tokenData.map((stopdata)=>{
       stopword.push(sw.removeStopwords(stopdata.data));
     })
     
     /*getting removing stop words*/

     tokenData.map((stopdata)=>{
      withStopword.push(sw.removeStopwords(stopdata.data,sw.removeStopwords(stopdata.data)));
    })
     
     /*stemming*/
     natural.PorterStemmer.attach()
     sentences.map((sentence)=>{
       let temp = sentence.tokenizeAndStem();
       stem.push(temp);
     })
     
     /*POS*/
     let words = new pos.Lexer().lex(messageOrder);
     let tagger = new pos.Tagger();
     let tagword = tagger.tag(words);
     for(let i in tagword) {
       let taggedWord = tagword[i];
       let word = taggedWord[0];
       let tag = taggedWord[1];
       let temp = word + " | " +tag;
       if(taggedWord[1]=== 'WDT' || taggedWord[1]=== 'WP$' || taggedWord[1]=== 'WRB' || taggedWord[1]=== 'WP'){
         intent.push(taggedWord[0]);
       }
       posData.push(temp);
       posWord.push(taggedWord[0]);
     }
     
     /*WordNet*/
     let wordnet = new natural.WordNet();
     pushed = {
       name : "WordNet Meaning",
       data : []
     }
     let t = false;
     tokenData.map((tokenword)=>{
       
       for(let i in tokenword.data){
         
         wordnet.lookup(tokenword.data[i], (res) => {
           res.forEach((re) => {
             let temp = re.synsetOffset + " | "+ re.lemma +" | "+ re.pos + " | "+ re.synonyms + " | " + re.gloss
             
             pushed.data.push(temp);
           })
         })
       }
     })
   }
 }
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.addcontextsyn.Error);            // making logs
    res.json({status:false, message:staticConfig.addcontextsyn.Error,data:error});
  } 
}