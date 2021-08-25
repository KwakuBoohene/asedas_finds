import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailService } from 'src/app/services/http/email/email.service';
import { StateService } from 'src/app/services/state/state.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  requestForm = new FormGroup({
    fname: new FormControl('',
    [Validators.required]),
    lname: new FormControl('',
    [Validators.required]),
    email: new FormControl('',
    [Validators.required, Validators.email]),
    phone_no: new FormControl('',
    [Validators.required]),
    instagram: new FormControl(''),
    messager: new FormControl('',
    [Validators.required])
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
      this.emailHTTP.contactUs(this.requestForm.value)
      .subscribe(
        res=>{
           console.log(res)
          this.showNotification('Your message has been sent')
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
