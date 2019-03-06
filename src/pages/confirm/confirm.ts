import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  input: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.input = this.navParams.get('input');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
    localStorage.setItem('confirm-ask', 'no');
  }
  // confirm user choice
  confirm() {
    localStorage.setItem('confirm-ask', 'yes');
    this.navCtrl.pop().catch(err => console.log(err));
  }
  // cancel user choice
  cancel() {
    localStorage.setItem('confirm-ask', 'no');
    this.navCtrl.pop().catch(err => console.log(err));
  }
}
