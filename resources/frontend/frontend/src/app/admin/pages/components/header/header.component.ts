import { SessionStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rotateAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations : [
    rotateAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private session : SessionStorageService
  ) { }
  menu:boolean;
  user;

  ngOnInit(): void {
    // this.user = this.session.retrieve('user') ;
  }
  logout(){

    this.router.navigateByUrl('/admin');
  }

}
