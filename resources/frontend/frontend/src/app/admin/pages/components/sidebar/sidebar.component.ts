import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rotateAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations : [
    rotateAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarRouter: Router) { }
  products: boolean = false;
  podcasts: boolean = false;
  messages: boolean = false;
  users: boolean = false;
  blogs: boolean = false;
  reports:boolean = false;
  url:string;

  ngOnInit(): void {
  }


}
