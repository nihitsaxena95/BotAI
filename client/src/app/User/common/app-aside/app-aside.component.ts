import { Component,Input,Output, OnInit} from '@angular/core';
import { AsideService } from './app-aside.service';
import { Config } from './app-aside_en_config';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.css']
})


export class AppAsideComponent implements OnInit{

  constructor(private asideService: AsideService) {}

  Config:any=Config;
  youid:any;
  youtubeid:any;
  player: YT.Player;

  // render videos before html templet loaded
  ngOnInit()
  {
    this.asideService.idEmitter.subscribe((ids) => {
      this.youid = ids;
      this.savePlayer(this.player);
      this.onStateChange(event);
    })
  }

  // youtube player save state method
  savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
  }

  // youtube player state change detection method
  onStateChange(event){
    console.log('player state', event);
  }
}