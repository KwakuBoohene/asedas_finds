import { AuthService } from './../../services/http/auth/auth.service';
import { AuthObject } from './../../types/data-types';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { rotateAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : [
    rotateAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class LoginComponent implements OnInit {
  success: boolean;
  redirectroute: string;
  isSubmitted = false;
  message:string;
  getParams;
  loginForm = new FormGroup({
    email: new FormControl('',
    [Validators.required, Validators.email]
    ),
    password: new FormControl('',
    [Validators.required]
    )
  });

  constructor(
    private authService: AuthService,
     private session : SessionStorageService,
    private loader : NgxUiLoaderService,
    private route : Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getParams = params;
      setTimeout(()=>{
        this.getParams = {};
      }, 3000)
    });
  }

  async onSubmit(){
    const auth:AuthObject = this.loginForm.value;
    this.loader.start();
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(
        auth
      ).subscribe(
        (res)=>{
          this.success = true;
          this.session.store('isLoggedIn',this.success);
          this.session.store('user',res.user);
          this.session.store('token',res.token);
          this.route.navigate(['admin/dashboard']);
        },
        (err)=>{
          console.log(err);
          this.message = err.error.message;
          this.success = false;
        }
      )

    }

    this.loader.stop();


  }

}
