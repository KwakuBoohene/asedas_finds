import { Router } from '@angular/router';
import { StateService } from './services/state/state.service';
import { Component, OnInit } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  sidebar_show:boolean;
  hideNav:boolean;
  type;color;

  constructor(
    private stateService: StateService,
    private router: Router){
      this.type = SPINNER.circle;
      this.color = '#59380B';
    }

  ngOnInit(){
    this.stateService.sidebar$.subscribe(
      res => this.sidebar_show = res
    );

    this.stateService.cart$.subscribe(
      res => console.log(res)
    );


  }

  changeOfRoutes():void{
    window.scrollTo(0, 0);
    this.stateService.toggleSidebar(false);
    if(this.router.url.includes('admin')){
      this.hideNav = true;
    }else{
      this.hideNav = false;
    }
  }

}
