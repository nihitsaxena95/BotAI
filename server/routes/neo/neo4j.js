import express from 'express'; // File for messages
import logger from '../../log4js';
import numerizer from 'numerizer';
import gingerbread from 'gingerbread';
import sw from 'stopword';
import natural from 'natural';
import lang from '../../util';
import tokenizer from 'sbd';
import pos from 'pos';
import neo4j from 'neo4j-driver';
import config from '../../config/config';
import staticConfig  from './Config';

const uri = config.neo4jUrl;

const driver = neo4j.driver(uri,neo4j.auth.basic("neo4j",config.neo4jurlpassword));

const sess = driver.session();
export default (req,res) => {
  try{
    let optional_options = {
      "newline_boundaries" : false,
      "html_boundaries"    : false,
      "sanitize"           : false,
      "allowed_tags"       : false,
      "abbreviations"      : null
    };
    let message = req.body.message.toLowerCase();
    let correct;
    let corrected = [];
    let stemword;
    let combinationwords = [];
    let mainpart = [];
    let total;
    message = numerizer(message); //numerize data
    let token = new natural.WordTokenizer();
    gingerbread(message,(error,text,result,corrections)=>{
      message = result;
      correct = corrections;
    setcorrected(); //spell corrected
    spellcorrected();
  });
    let setcorrected = () => {
      correct.map((data) => {
        corrected.push(data.text);
      })
    }
    let spellcorrected = () => {
        message = lang.replace.all(message); //abbrevation removed
        message = message.toLowerCase();
        let sentences = tokenizer.sentences(message, optional_options); //sentence tokenize
        if(sentences.length > 1) { //more than one sentence
          stemsentence(sentences);
          multiplesentence(sentences);
        }
        else { //single sentence
          ngrams(sentences[0]);
          stemsentence(sentences);
          singlesentence(sentences[0]);
        }
      }
     let ngrams = () => {  //making all possible combination of words
      let meaningWord = "";
      for(let i = 2; i<=5;i++){
        let nGrams = natural.NGrams;
        let nToken = nGrams.ngrams(message, i);
        for(let j in nToken) {
          for(let k in nToken[j]) {
            meaningWord += (nToken[j][k]+" ");
            combinationwords.push(meaningWord.trim());
          }
          meaningWord = "";
        }    
      }
    }
     let stemsentence   = (sentences) => { //stemming words in array 
      natural.PorterStemmer.attach()
      sentences.map((sentence)=>{
        stemword = sentence.tokenizeAndStem()
      })
    }
    let singlesentence = (sentences) => { //handle single sentence
      let maintoken = token.tokenize(sentences);
      let withoutstopword = [];
      let stopword = [];
      corrected.map((data) => {
        maintoken.push(data);
      })
      stemword.map((data) => {
        maintoken.push(data);
      })
      combinationwords.map((data) => {
        maintoken.push(data);
      })
      
      withoutstopword = sw.removeStopwords(maintoken);
      stopword = sw.removeStopwords(maintoken,sw.removeStopwords(maintoken));
      let cover = posword(stopword);
      cover.map((data) => {
        withoutstopword.push(data);
      })

      total = withoutstopword.length;
      
      findcontent(withoutstopword);
    }
    let posword = (stopword) => {  //Part of Speech breaking
      let cover = [];
      let words = new pos.Lexer().lex(message);
      let tagger = new pos.Tagger();
      let tagword = tagger.tag(words);
      for(let i in tagword) {
        let taggedWord = tagword[i];
        if(taggedWord[1]=== 'WDT' || taggedWord[1]=== 'WP$' || taggedWord[1]=== 'WRB' || taggedWord[1]=== 'WP' || taggedWord[1]=== 'JJ' || taggedWord[1]=== 'PP$' || taggedWord[1]=== 'IN' || taggedWord[1]=== 'MD' || taggedWord[1]=== 'CC' || taggedWord[1]=== 'PRP'){
          cover.push(taggedWord[0]);
        }
      }
      return cover;
    }
    let findcontent = (withoutstopword) => { //findcontent based on intent and context
      let non = 0;
      let temp=0;
      
      withoutstopword.map((dataword) => {
        let flag=0;
        if(dataword == "me") {
        }
        let find = sess.run("match (aa:Synonym) where aa.name = '"+dataword+"' match (aa)-[:SameAs]-(xx) return xx");
        find.then((result) => {
          temp++;
          let main = {
            data : result.records
          }
          
          if(main.data.length > 0) {
            mainpart.map((data) => {
              if(data[0]._fields[0].identity.low == main.data[0]._fields[0].identity.low) {
                flag++;
              }
            })
            if(flag==0) {              
              mainpart.push(main.data);
            }
          }
          checktemp(temp);
        }, (err) => {
          return err;
        })

      })
    }

    let checktemp = (temp) => {

      if(temp == total) {

        if(mainpart.length == 0) {
          logger.info(staticConfig.neo.TroubleUnderstanding);   //making logs
          res.json({message : [{message : staticConfig.neo.TroubleUnderstanding}],links : []})
        } else {

          giveresponse(mainpart);
        }
      }
    }    
    let giveresponse = (main) => {   //response giving according to priority
      let intent = [];
      let context = [];
      
      main.map((data) => {
        let insert = {
          type : "",
          name : "",
          rank : ""
        }
        if(data[0]._fields[0].labels[0] == 'Intent' || data[0]._fields[0].labels[0] == 'SubIntent') {
          insert.type = data[0]._fields[0].labels[0];
          insert.name = data[0]._fields[0].properties.name;
          insert.rank = data[0]._fields[0].properties.priority
          intent.push(insert);
        }
        else {
          insert.type = data[0]._fields[0].labels[0];
          insert.name = data[0]._fields[0].properties.name
          context.push(insert);
        }
      })
      
      res.json({intent : intent, context : context})
    }
  }catch(error){                                                      // error handle if suddenly error occur in database
    logger.info(staticConfig.neo.Error);                        // making logs
    res.json({status:false, message:staticConfig.neo.Error,data:error});
  }    
}