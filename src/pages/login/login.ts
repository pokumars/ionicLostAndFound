import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginResponse } from '../../interfaces/loginResponse'
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupPage= SignupPage;
  homePage = HomePage;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(form) {
    console.log(form.value)
    this.authProvider.login(form.value.username, form.value.password)
    .subscribe((response: LoginResponse) => {
      // successful login. Store token, user id, email and username
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('user_id', response.user.user_id.toString());

      this.navCtrl.setRoot(HomePage);


    },error => console.log('yeeeee man this be da error', error));
  }

}
