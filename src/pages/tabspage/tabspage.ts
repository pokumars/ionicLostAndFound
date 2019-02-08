import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabspagePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabspage',
  templateUrl: 'tabspage.html'
})
export class TabspagePage {

  homeRoot = 'HomePage'
  profileRoot = 'ProfilePage'


  constructor(public navCtrl: NavController) {}

}
