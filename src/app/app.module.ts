import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { TabspagePage } from '../pages/tabspage/tabspage';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';
import { AuthProvider } from '../providers/auth/auth';
import { MediaProvider } from '../providers/media/media';
import { UploadPage } from '../pages/upload/upload';
import { PostPage } from '../pages/post/post';
// pipe
import { PipesModule } from '../pipes/pipes.module';
import { UserPipe } from '../pipes/user/user-info';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';


@NgModule({
  declarations: [
    MyApp,
    TabspagePage,
    LoginPage,
    SignUpPage,
    LandingPage,
    UploadPage,
    PostPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TabspagePage,
    MyApp,
    LoginPage,
    SignUpPage,
    LandingPage,
    UploadPage,
    PostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    MediaProvider,
    Chooser,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
