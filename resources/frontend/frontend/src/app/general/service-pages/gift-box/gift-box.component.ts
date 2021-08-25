import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailService } from 'src/app/services/http/email/email.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-gift-box',
  templateUrl: './gift-box.component.html',
  styleUrls: ['./gift-box.component.scss']
})
export class GiftBoxComponent implements OnInit {

  requestForm = new FormGroup({
    name: new FormControl('',
    [Validators.required]),
    phone_no: new FormControl('',
    [Validators.required]),
    instagram: new FormControl(''),
    facebook: new FormControl(''),
    receipient: new FormControl('',
    [Validators.required] ),
    option: new FormControl('',
    [Validators.required] ),
    receipient_number: new FormControl('',
    [Validators.required] ),
    receipient_instagram: new FormControl(''),
    receipient_facebook: new FormControl(''),
    date: new FormControl('',
    [Validators.required]),
    messager: new FormControl(''),
    location: new FormControl('',
    [Validators.required] ),
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
    console.log(this.requestForm.errors)
    if(this.requestForm.valid){
      this.emailHTTP.giftBox(this.requestForm.value)
      .subscribe(
        res=>{
           console.log(res)
          this.showNotification('Your Gift BOx Request has been successfully made')
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
