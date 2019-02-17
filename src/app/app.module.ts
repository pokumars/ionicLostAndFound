import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from '../pages/home/home.module'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabspagePage } from '../pages/tabspage/tabspage';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { AuthProvider } from '../providers/auth/auth';
import { MediaProvider } from '../providers/media/media';
import { PipesModule } from '../pipes/pipes.module';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';

@NgModule({
  declarations: [
    TabspagePage,
    MyApp,
    LoginPage,
    SignUpPage,
    ThumbnailPipe
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
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MediaProvider
  ]
})
export class AppModule {}
