import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UserPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userInfo',
})
export class UserPipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {  }

  transform(id: number, type: string, size?: string) {
    console.log('avatar of user: ' + id);
    if(type === 'avatar'){
      return this.mediaProvider.getProfilePicName(id, size);
    } else {
      console.log('trying to get user detail:' + type + ' of user id: ' + id);
      return this.mediaProvider.getUserDetail(id, type);
    }

  }
}
