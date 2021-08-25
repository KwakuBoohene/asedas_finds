import { Component, Input, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-admin-modal-small',
  templateUrl: './admin-modal-small.component.html',
  styleUrls: ['./admin-modal-small.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class AdminModalSmallComponent implements OnInit {
  isModalShowing:boolean;
  @Input() size:string;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.stateService.modal2$.subscribe(
      res => {
        this.isModalShowing = res;
      }
    );
  }

  closeModal():void{
    this.stateService.toggleModal2(false);
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    if(idAttr){
      if(idAttr.nodeValue === "myModal"){
        this.closeModal();
      }
    }
  }

}
