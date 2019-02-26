import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from '../../interface/user';
import { AuthProvider } from '../../providers/auth/auth';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  user: User = {
    username: '',
    email: '',
    password: ''
  };
  sentData = {};
  emailValid = true;
  passwordValid = true;
  userValid = true;
  formValid = false;
  verify = '';
  confirmationCheck = false;
  confirmValid = false;
  oldPassword = '';
  @ViewChild('trydis') passwordInput: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider,
              private mediaProvider: MediaProvider) {
  }
  // when page is turned on
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  // checking user name on press
  usernameCheck() {
    if (this.user.username.length > 3) {
      this.authProvider.checkUsername(this.user.username).subscribe(res => {
        this.userValid = (res.available === true);
        this.formCheck();
      });
    }
    else if (this.user.username === ''){
      this.userValid = true;
      this.formCheck();
    }
    else {
      this.userValid = false;
      this.formCheck();
    }
    console.log('click');
  }
  // matching password check
  passwordCheck() {
    this.passwordValid = (this.user.password.length > 4 && this.user.password === this.verify) || this.user.password === '';
    console.log(this.passwordValid);
    this.formCheck();
  }
  // checking email
  emailCheck() {
    this.emailValid = this.user.email.match('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$') !== null || this.user.email === '';
    this.formCheck();
  }
  // checking the entirety of the form
  formCheck() {
    let allEmpty = this.user.username !== '' || this.user.email !== '' || this.user.password !== '';
    console.log('xxxxxxx');
    console.log(this.emailValid);
    console.log(this.userValid);
    console.log(this.passwordValid);
    this.formValid = this.userValid && this.emailValid && this.passwordValid && allEmpty;
  }
  // modify user data
  modifyUser() {
    this.sentData = {};
    if(this.user.username !== '') {
      this.sentData['username'] = this.user.username;
    }
    if(this.user.password !== '') {
      this.sentData['password'] = this.user.password;
    }
    if(this.user.email !== '') {
      this.sentData['email'] = this.user.email;
    }
    console.log(this.sentData);
    this.confirmationCheck = true;
  }
  //localStorage.setItem('username', response.user.username);
  //       localStorage.setItem('email', response.user.email);
  //       localStorage.setItem('password', form.value.password);
  // confirm sent data and send data for modification
  confirmSentData() {
    let correctOldPassword = localStorage.getItem('password');
    console.log(correctOldPassword);
    if (this.oldPassword === correctOldPassword) {
      this.mediaProvider.modifyUserData(this.sentData).subscribe(ans => {
        console.log(ans);
        if(this.user.username !== '') {
          localStorage.setItem('username', this.user.username);
        }
        if(this.user.password !== '') {
          localStorage.setItem('password', this.user.password);
        }
        if(this.user.email !== '') {
          localStorage.setItem('email', this.user.email);
        }
        this.navCtrl.pop().catch(err => console.log(err));
      })
    } else {
      this.oldPassword = '';
      this.confirmValid = false;
    }
  }
  // cancel confirmation
  cancelConfirm() {
    this.confirmationCheck = false;
  }
}
