import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherUserPage } from './other-user';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OtherUserPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherUserPage),
    PipesModule
  ],
})
export class OtherUserPageModule {}
