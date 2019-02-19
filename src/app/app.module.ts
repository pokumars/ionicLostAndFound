import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from '../pages/home/home.module';
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabspagePage } from '../pages/tabspage/tabspage';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';
import { AuthProvider } from '../providers/auth/auth';
import { MediaProvider } from '../providers/media/media';
import { PipesModule } from '../pipes/pipes.module';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { UploadPage } from '../pages/upload/upload';

@NgModule({
  declarations: [
    TabspagePage,
    MyApp,
    LoginPage,
    SignUpPage,
    LandingPage,
    UploadPage
    // ThumbnailPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HomePageModule,
    // PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TabspagePage,
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    LandingPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MediaProvider,
    Chooser,
    Camera
  ]
})
export class AppModule {}
