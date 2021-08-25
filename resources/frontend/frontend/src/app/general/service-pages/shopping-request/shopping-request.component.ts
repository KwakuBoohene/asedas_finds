import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailService } from './../../../services/http/email/email.service';
import { StateService } from './../../../services/state/state.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-shopping-request',
  templateUrl: './shopping-request.component.html',
  styleUrls: ['./shopping-request.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ShoppingRequestComponent implements OnInit {
  requestForm = new FormGroup({
    name: new FormControl('',
    [Validators.required]),
    phone_no: new FormControl('',
    [Validators.required]),
    instagram: new FormControl(''),
    facebook: new FormControl(''),
    size: new FormControl('',
    [Validators.required]),
    items_no: new FormControl('',
    [Validators.required,RxwebValidators.numeric() ] ),
    items_needed: new FormControl('',
    [Validators.required]),
    location: new FormControl('',
    [Validators.required] )
  });
  submitted:boolean;

  constructor(
    private loader:NgxUiLoaderService,
    private state:StateService,
    private emailHTTP: EmailService
  ) { }

  ngOnInit(): void {
  }

  showNotification(message){
    this.loader.stop();
    this.state.sendMessage(message);
    this.state.toggleNotification(true);
    setTimeout(() => {
      this.state.toggleNotification(false);
    }, 1500);
  }
  submit(){
    this.loader.start();
    if(this.requestForm.valid){
      this.emailHTTP.shoppingRequest(this.requestForm.value)
      .subscribe(
        res=>{
           console.log(res)
          this.showNotification('Your Shopping Request has been successfully made')
          this.requestForm.reset();
          },
        err =>{
          console.log(err);
          this.showNotification('Oops. Something Went wrong. Please Try again')
        }
      )
    }else{
      this.showNotification('Please make sure you fill all required fields (*) properly')
    }
  }

}
