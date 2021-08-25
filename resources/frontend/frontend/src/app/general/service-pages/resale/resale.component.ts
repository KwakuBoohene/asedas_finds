import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailService } from 'src/app/services/http/email/email.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-resale',
  templateUrl: './resale.component.html',
  styleUrls: ['./resale.component.scss']
})
export class ResaleComponent implements OnInit {

  requestForm = new FormGroup({
    name: new FormControl('',
    [Validators.required]),
    phone_no: new FormControl('',
    [Validators.required]),
    state: new FormControl('',
    [Validators.required]),
    instagram: new FormControl(''),
    items_no: new FormControl('',
    [Validators.required,RxwebValidators.numeric() ] ),
    location: new FormControl('',
    [Validators.required] ),
    email: new FormControl('',
    [Validators.email] )
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
    console.log(this.requestForm.value)
    if(this.requestForm.valid){
      this.emailHTTP.resale(this.requestForm.value)
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
