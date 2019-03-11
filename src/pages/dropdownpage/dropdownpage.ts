import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private toastCtrl: ToastController) {
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
    this.presentToast(mem);

    this.navCtrl.pop()
      .then(() => {
        console.log('do something');
      })
      .catch(err => console.log(err));
  }
  presentToast(type: string) {
    let toast = this.toastCtrl.create({
      message:`${type} post`,
      duration:3000,
      position: 'bottom'
    });

    toast.onDidDismiss(()=>{
      console.log('internet down selected toast');
    });

    toast.present();
  }
}
