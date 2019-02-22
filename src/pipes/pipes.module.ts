import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { UserPipe } from './user/user';

@NgModule({
	declarations: [
	  ThumbnailPipe,
    UserPipe
  ],
	imports: [],
	exports: [
	  ThumbnailPipe,
    UserPipe
  ]
})
export class PipesModule {}
