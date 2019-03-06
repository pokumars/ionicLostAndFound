import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { TabspagePage } from '../pages/tabspage/tabspage';// this gotta go
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';
import { AuthProvider } from '../providers/auth/auth';
import { MediaProvider } from '../providers/media/media';
import { UploadPage } from '../pages/upload/upload';
import { PostPage } from '../pages/post/post';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { LostPage } from '../pages/lost/lost';
import { FoundPage } from '../pages/found/found';
import { Tabs2Page } from '../pages/tabs2/tabs2';
import { ProfilePage } from '../pages/profile/profile';
import { MyPostsPage } from '../pages/my-posts/my-posts';
import { SharedMethodsProvider } from '../providers/shared-methods/shared-methods';

import { PipesModule } from '../pipes/pipes.module';
import { LongPressModule } from "ionic-long-press";
import { HttpClientModule } from '@angular/common/http';
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera';
import { ComponentsModule } from '../components/components.module';
import { DropdownpagePage } from '../pages/dropdownpage/dropdownpage';
import { EditPostPage } from '../pages/edit-post/edit-post';
import { ConfirmPage } from '../pages/confirm/confirm';
import {OtherUserPage} from "../pages/other-user/other-user";


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
    DropdownpagePage,
    MyPostsPage,
    EditPostPage,
    ConfirmPage,
    OtherUserPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      // this makes the tabs disappear on sub pages
      tabsHideOnSubPages: true
    }),
    PipesModule,
    LongPressModule,
    ComponentsModule
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
    DropdownpagePage,
    MyPostsPage,
    EditPostPage,
    ConfirmPage,
    OtherUserPage
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
