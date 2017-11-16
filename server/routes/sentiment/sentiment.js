import express from 'express';
import userSchema from '../../model/register_schema';  // File for messages
import logger from '../../log4js';
import tokenizer from 'sbd';
import pos from 'pos';
import Twitter from 'twitter';
import sentiment from 'sentiment';
import staticConfig  from './Config';

export default (req,res) => {
  try{
    var client = new Twitter({
      consumer_key: 'imaiZ1siu5bstoNkHZD7jotg3',
      consumer_secret: 'FVcJFySNkaMwK0UcaQUotaZV0lZMBe2lVqJ93lU81MFmZkMbyK',
      access_token_key: '759689874-VFRIAYEKaSU8a5cfFwXqdoZrqUwaUCwwHQBMlikY',
      access_token_secret: 'W6dKS9aaSAfHqGcSaqYGY1N3lyjeg5jhy16KR6H6AZXC3'
    });

    let score=0;
    let negative=0;
    let positive=0;
    let cal=1;
    let percent;
    client.get('search/tweets', {q:req.body.plan}, function(error, tweets, response) {

      if (error) {
    logger.info(staticConfig.sentiment.Error);   //making logs
    res.json({status:false,message:staticConfig.sentiment.Error,data:null});       //response to client
  }
  else{
    tweets.statuses.map((data)=>{

      var r1 = sentiment(data.text);
      
      
      score=score+r1.score
      negative=negative+r1.negative.length;
      positive=positive+r1.positive.length;
      
    })

    if(positive>negative) {
      cal=((positive-negative)/positive)*100;
      percent=parseFloat(Math.round(cal * 100) / 100).toFixed(2);
    }
    else if(negative>positive) {
     cal=((negative-positive)/negative)*100;
     percent=parseFloat(Math.round(cal * 100) / 100).toFixed(2);
   }
   else{
    percent=0;
  }

      logger.info(staticConfig.sentiment.DataFound);   //making logs
      res.json({status:true,message:staticConfig.sentiment.DataFound,score:percent})  //response to client
    }
  });
  }catch(error){                                            // error handle if suddenly error occur in database
    logger.info(staticConfig.sentiment.Error);                  // making logs
    res.json({status:false, message:staticConfig.sentiment.Error,data:error});
  }
}