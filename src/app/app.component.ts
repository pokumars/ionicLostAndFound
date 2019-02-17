import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabspagePage } from '../pages/tabspage/tabspage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabspagePage; // loginPage should be the root page until user is logged in


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    /* if you have token (i.e you are logged in) it shouldnt
      start from login page  but rather from <SomePage>*/
      if (localStorage.getItem('token') ) {
      this.rootPage = TabspagePage;
    }else{
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }).catch(err => console.log(err));
  }
}
