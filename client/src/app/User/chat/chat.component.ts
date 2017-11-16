import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { ChatService } from './chat.service';
import { Router, NavigationEnd } from '@angular/router';
import swal from 'sweetalert2';
import Config from './chat_en_config';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  answer:any;
  Config:any=Config;
  question:any[]=[];
  res: any;
  ref:any;
  rep:any;
  flag = -2; 
  maincounter:any;
  tempfollowquestion:any;
  tempfollowtype:any;
  answ:any = {};
  links:any=0;
  moreInfoLink:any;
  ans;
  videoId:any[]=[];
  url:any;
  flowanswer:any[] = [];
  id:any;
  username:any;

  constructor(private chatService:ChatService, private router: Router) { }

  scrollToBottom(): void { // scrolling with answers
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                
  }

  ngOnInit() { //introduction message to start the chat
    let value;
    value = JSON.parse(localStorage.getItem(Config.component.localStorage)).data;
    this.scrollToBottom();
   // this.getquestion();
   this.username = value.name;

    setTimeout(() =>{
      let temp = {
        bot : Config.component.startMsg1+value.name+Config.component.startMsg2
      }
      this.question.push(temp);
    },1000)
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  fetch(ans){ //fetching the response on different condition
    this.ans = ans;
    this.resp = null;
    this.answer="";
    if(!this.maincounter) {     //if no follow up questions
      this.chatService.fetch(ans).subscribe((res)=> {
        console.log(res);
        if(res.message == Config.component.badCount) {
          swal(
            Config.component.logout,
            Config.component.logoutMsg,
            'warning'
            )
          this.chatService.forceLogout().subscribe((res)=> this.res = res)
          localStorage.removeItem(Config.component.localStorage);
          this.router.navigateByUrl('/');
        } else {
          if(res.message.length == 0) {
            let temp = {
              bot : Config.component.sorryMsg1
            }
            this.question.push(temp);
            this.unansweredquestion();
          } else {
            this.moreInfoLink=res.links.length;
            let temp = {
              bot : res.message[0].message
            }
            this.question.push(temp);  
          }
        }
        let linkend =[];
        this.question[this.question.length -1].link = res.links;
        this.question[this.question.length-1].video = [];
        console.log(this.question);
        res.links.map((data) => {
          if(data.Counter) {
            this.followup(data.Counter);
          } else if(data.Video) {
            let video = data.Video.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            this.question[this.question.length-1].video.push(video);
          } 
        })
      }, (dataError)=>{
         //localStorage.removeItem(Config.component.localStorage);
        this.router.navigateByUrl('/error'); 
      })
    } 
    else { //if at the time of followup questions
      if(this.tempfollowquestion.genre == Config.component.question) {
        this.flowanswer.push(ans);
      }
      this.chatService.nextfollowup(this.maincounter,this.tempfollowquestion,ans)
      .subscribe((res) => {
        this.setfollowup(res);
      }, (dataError)=>{
         //localStorage.removeItem(Config.component.localStorage);
        this.router.navigateByUrl('/error'); 
      })
    }
    this.videoId=[];
  }

  fetchHistory() {
    this.getquestion(true);
  }

  judge(ans) {  //pushing the message to the chat application
    this.question[this.question.length-1].user = ans;
    this.questiontemp = this.question[this.question.length -1];
    this.getquestion(false);
    this.fetch(ans);
  }

  followup(counter) {  //triggering the follow up
    this.maincounter = counter;
    this.triggerfollowup(counter);
  }

  triggerfollowup(counter) { // getting the required trigger flow
    this.chatService.triggerfollowup(counter).subscribe((res) => {
      if(res.type.length > 0) {
        this.setfollowup(res);
      }
    }, (dataError)=>{
         //localStorage.removeItem(Config.component.localStorage);
        this.router.navigateByUrl('/error'); 
      })
  }

  setOut(question) {   // giving output to chat
    setTimeout(()=> {
      if(!question.option) {
        let temp = {
          bot :question.message
        }
        this.question.push(temp);
      } else {
        let temp = {
          bot : question.message,
          option : question.option
        }
        this.question.push(temp);
      }
    },2000);
  }

  setfollowup(question) {   // pushing data to chat based on type
    let t =1;
    this.tempfollowquestion = question;
    if(this.tempfollowquestion.next == -1) {
      this.setOut(question);
      this.maincounter = undefined;
      this.tempfollowquestion = undefined;
    }
    else if(this.tempfollowquestion.type == Config.component.tempfollowquestiontype) {
      this.setOut(question);
    } else if(this.tempfollowquestion.result) {
      this.setOut(question);
      this.maincounter = undefined;
      this.tempfollowquestion = undefined;
    } else {
      this.setOut(question);
    }
  }

  questiontemp:any ;
  getquestion(flag) {   
    this.chatService.getquestions(this.questiontemp)
    .subscribe((res)=>{
      if(flag) {
         this.question=res.data;
          setTimeout(() =>{
      let temp = {

        bot : Config.component.startMsg1+this.username+Config.component.startMsg2
      }
      this.question.push(temp);
    },1000)
      }
    }, (dataError)=>{
       //localStorage.removeItem(Config.component.localStorage);
        this.router.navigateByUrl('/error'); 
    })
  }
  resp:any;
  index:any;
  next(ans:any,index){
    this.resp = [];
    this.index = index;
    let linked = [];
    this.question[index].link.map((data) => {
      if(data.Link) {
        linked.push(data.Link)
      }
    })
    this.answ.Link = linked;
    this.chatService.checklink(this.answ.Link).subscribe((resp)=>{
      this.resp = resp}, (dataError)=>{
        this.router.navigateByUrl('/error'); 
      })
    //resp contains the unfurled data from server
  }
  unansweredquestion(){ //saving unanswered question
    this.chatService.unansweredquestion(this.answer)
    .subscribe ((ref)=>{
    }, (dataError)=>{
        this.router.navigateByUrl('/error'); 
    })
  }
}


