import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { StateService } from 'src/app/services/state/state.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class NotificationComponent implements OnInit {
  message:string;
  isShowing:boolean;
  constructor(private state:StateService) { }

  ngOnInit(): void {
    this.state.message$.subscribe(
      res=> this.message = res
    );
    this.state.notification$.subscribe(
      res=>{
        this.isShowing = res;
        console.log('toggled')
      }
    )
  }

}
