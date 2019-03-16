import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginResponse } from '../../interfaces/loginResponse'
//import { HomePage } from '../home/home';
import { TabspagePage } from '../tabspage/tabspage';
import { Tabs2Page } from '../tabs2/tabs2';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupPage= SignUpPage;
  //homePage = HomePage;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // In next update
  // add smth that lets user know that the password/email is wrong
  onLogin(form) {
    // console.log(form.value);
    this.authProvider.login(form.value.username, form.value.password)
    .subscribe((response: LoginResponse) => {
      // successful login. Store token, user id, email and username
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('password', form.value.password);
      localStorage.setItem('user_id', response.user.user_id.toString());

      //if we use this then we can delete tabspage as well home
      this.navCtrl.setRoot(Tabs2Page).catch(err => console.log(err));



    },error => console.log('yeeeee man this be da error', error));
  }

}
