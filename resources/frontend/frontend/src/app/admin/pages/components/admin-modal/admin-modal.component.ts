import { StateService } from '../../../../services/state/state.service';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-admin-modal-large',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class AdminModalComponent implements OnInit {
  isModalShowing:boolean;
  @Input() size:string;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.stateService.modal$.subscribe(
      res => {
        this.isModalShowing = res
      }
    );
  }

  closeModal():void{
    this.stateService.toggleModal(false);
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
