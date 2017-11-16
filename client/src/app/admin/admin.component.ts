import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public router: Router) { }
  //---------------ngOnINit starts here------------------
  ngOnInit() {
    this.getProduct(); 
  }
  //-----ngOnInit ends here------------------------

  //--------------getProduct starts here--------------
  getProduct(){  
    if (this.router.url === '/admin') {
      this.router.navigate(['/admin/dashboardAdmin']);
    }
  }
}
//------------------getProduct ends here------------------------