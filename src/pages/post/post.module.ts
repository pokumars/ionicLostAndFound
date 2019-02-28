import {Component, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    PipesModule,
    ComponentsModule
  ],
})
export class PostPageModule {}
