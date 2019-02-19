import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';

@NgModule({
  declarations: [
    HomePage,
    ThumbnailPipe
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
