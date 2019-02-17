import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';

@NgModule({
  declarations: [
    ProfilePage,
    ThumbnailPipe,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
