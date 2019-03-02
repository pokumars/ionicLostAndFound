import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { TabspagePage } from '../pages/tabspage/tabspage';// this gotta go
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';
import { AuthProvider } from '../providers/auth/auth';
import { MediaProvider } from '../providers/media/media';
import { UploadPage } from '../pages/upload/upload';
import { PostPage } from '../pages/post/post';

import { PipesModule } from '../pipes/pipes.module';
import {ProfileEditPage} from "../pages/profile-edit/profile-edit";
import { LostPage } from '../pages/lost/lost';
import { FoundPage } from '../pages/found/found';
import { Tabs2Page } from '../pages/tabs2/tabs2';
import { ProfilePage } from '../pages/profile/profile';
import { MyPostsPage } from '../pages/my-posts/my-posts';
import { SharedMethodsProvider } from '../providers/shared-methods/shared-methods';


@NgModule({
  declarations: [
    MyApp,
    TabspagePage,
    Tabs2Page,
    LoginPage,
    SignUpPage,
    LandingPage,
    UploadPage,
    PostPage,
    ProfileEditPage,
    LostPage,
    FoundPage,
    ProfilePage,
    MyPostsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      // this makes the tabs disappear on sub pages
      tabsHideOnSubPages: true
    }),
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TabspagePage,
    Tabs2Page,
    MyApp,
    LoginPage,
    SignUpPage,
    LandingPage,
    UploadPage,
    PostPage,
    ProfileEditPage,
    LostPage,
    FoundPage,
    ProfilePage,
    MyPostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    MediaProvider,
    Chooser,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedMethodsProvider,
  ]
})
export class AppModule {}
