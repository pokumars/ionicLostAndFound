import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DropdownpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dropdownpage',
  templateUrl: 'dropdownpage.html',
})
export class DropdownpagePage {

  resolveStatus = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DropdownpagePage');
    console.log(this.navParams.get('resolve_status'));
    this.resolveStatus = this.navParams.get('resolve_status');
  }
  // move post function to here
  rememberPost(mem: string) {
    console.log('click');
    localStorage.setItem('mem', mem);
    this.navCtrl.pop().catch(err => console.log(err));
  }
}
