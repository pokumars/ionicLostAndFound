import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { User } from "../../interface/user";
import { TabspagePage } from "../tabspage/tabspage";


/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {
  user: User = {
    username: '',
    email: '',
    password: ''
  };
  verify = '';
  emailValid = false; emailInput = false;
  passwordValid = false; passwordInput = false; passwordLengthValid = false;
  userValid = false; userInput = false;
  formValid = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider) {
  }
  // when page is turned on
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  //signing user up.
  // register new user
  userRegister() {
    console.log('new user');
    this.authProvider.registerUser(this.user).subscribe(response => {
      console.log(response);
      this.authProvider.login( this.user.username,  this.user.password ).subscribe(response => {
        if (response.message === 'Logged in successfully') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('email', response.user.email);
          localStorage.setItem('user_id', response.user.user_id.toString());
          console.log('uhuh!!!!');
          this.navCtrl.setRoot(TabspagePage).catch((err)=>{
            console.log(err)
          });
        } else {
          console.log('nooooooo');
        }
      });
    }, err => {console.log(err);
    });
  }
  // checking user name on press
  usernameCheck() {
    this.userInput = true;
    this.authProvider.checkUsername(this.user.username).subscribe(res => {
      this.userValid = (res.available === true && this.user.username.length > 3);
      this.formCheck();
    });
    console.log('click');
  }
  // matching password check
  passwordCheck() {
    this.passwordInput = true;
    this.passwordValid = (this.verify === this.user.password);
    this.passwordLengthValid = (this.user.password.length > 4);
    console.log(this.passwordValid);
    this.formCheck();
  }
  // checking email
  emailCheck() {
    this.emailInput = true;
    this.emailValid = this.user.email.match('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$') !== null;
    console.log(this.user.email.match('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'));
    this.formCheck();
  }
  // checking the entirety of the form
  formCheck() {
    this.formValid = this.userValid && this.emailValid && this.passwordValid && this.passwordLengthValid;
  }
}
