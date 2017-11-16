import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from './bottom-chat_en_config';

@Component({
  selector: 'app-bottom-chat',
  templateUrl: './bottom-chat.component.html',
  styleUrls: ['./bottom-chat.component.css']
})
export class BottomChatComponent implements OnInit {
  Config:any=Config;
  config;

  //--------- start of buttons-------------
  buttons: any= [
  {
    iconClass: Config.bottomchat.fahome,
    label: Config.bottomchat.Home,
    onClick: ()=> {
      this.router.navigateByUrl('admin/dashboardAdmin');
    }
  },
  {
    iconClass: Config.bottomchat.falocation,
    label: Config.bottomchat.addflow,
    onClick: ()=> {
      this.router.navigateByUrl('admin/createflow');
    }
  },
  {
    iconClass: Config.bottomchat.fasignout,
    label: Config.bottomchat.Logout,
    onClick: ()=> {
      localStorage.removeItem(Config.bottomchat.Userdata);
      localStorage.removeItem(Config.bottomchat.key);
      localStorage.removeItem(Config.bottomchat.isLoggedin);
      this.router.navigateByUrl('/login');
    }
  },
  ];
  //-----------------end of buttons---------------

  placements = Config.bottomchat.placements;

  effects = Config.bottomchat.effects;

  toggles = Config.bottomchat.toggle;

  //-----------------placement effects toggle button---------------
  constructor(private router:Router) { 
    //----------------set configuration for floating menu------------
    this.config = Config.bottomchat.thisconfig;
  }

  ngOnInit() {
  }

}
