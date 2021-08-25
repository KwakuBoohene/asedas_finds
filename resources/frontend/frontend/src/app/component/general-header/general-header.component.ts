import { SessionStorageService } from 'ngx-webstorage';
import { StateService } from '../../services/state/state.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Item } from 'src/app/types/data-types';

@Component({
  selector: 'app-general-header',
  templateUrl: './general-header.component.html',
  styleUrls: ['./general-header.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class GeneralHeaderComponent implements OnInit {
  items:Item[];
  sidebar_show:boolean;
  all_services_show:boolean;

  constructor(
    private stateService: StateService,
    private session:SessionStorageService) { }

  ngOnInit(): void {
    this.all_services_show = false;
    this.stateService.sidebar$.subscribe(
      (res) => {
        this.sidebar_show = res;
        this.all_services_show = res;
      }
    );
    this.items = this.session.retrieve('cart')?this.session.retrieve('cart'):[];
    this.stateService.cart$.subscribe(
      res => this.items = res
    );
  }

  toggleSidebar():void{
    this.sidebar_show = !this.sidebar_show;
    this.stateService.toggleSidebar(this.sidebar_show);
  }

  toggleAllServices():void{
    this.all_services_show = !this.all_services_show
  }



}
