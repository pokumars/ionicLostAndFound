import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabspage',
  templateUrl: 'tabspage.html'
})
export class TabspagePage {

  homeRoot = 'HomePage';
  profileRoot = 'ProfilePage';


  constructor(public navCtrl: NavController) {}

}
