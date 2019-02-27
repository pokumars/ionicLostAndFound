import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LandingPage } from '../pages/landing/landing';
import { TabspagePage } from '../pages/tabspage/tabspage';
import { Tabs2Page } from '../pages/tabs2/tabs2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = Tabs2Page; //for testing purposes
  rootPage:any = LandingPage; // is the page user gonna see first, to display logo
  // rootPage:any = LoginPage; // loginPage should be the root page until user is logged in

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    /* if you have token (i.e you are logged in) it shouldnt
      start from login page  but rather from <SomePage>*/

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }).catch(err => console.log(err));
  }
}
