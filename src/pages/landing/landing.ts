import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabspagePage } from "../tabspage/tabspage";

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    const initSpinner = this.loadCtrl.create({
      content: 'initiating app',
    });
    initSpinner.present().catch(err => console.log(err));
    console.log('ionViewDidLoad LandingPage');
    setTimeout(() => {
      initSpinner.dismiss().catch(error => console.log(error));
      console.log('timeout');
      if (localStorage.getItem('token') ) {
        this.navCtrl.push(TabspagePage).catch(err => console.log(err));
      } else {
        this.navCtrl.push(LoginPage).catch(err => console.log(err));
      }

    }, 300)
  }

}
