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
  // id: id of the user
  // type: type of the answer which is needed
  // - avatar: to get avatar link
  // - lost-stat, found-stat: to get lost or found statistics
  // - else: get all user data in {} form
  transform(id: number, type: string, size?: string) {
    console.log('looking for' + type + ' of user: ' + id);
    if(type === 'avatar'){
      return this.mediaProvider.getProfilePicName(id, size);
    } else if(type === 'lost-stat') {
      return this.mediaProvider.getStat('lost',id);
    } else if(type === 'found-stat') {
      return this.mediaProvider.getStat('found',id);
    } else {
      console.log('trying to get user detail:' + type + ' of user id: ' + id);
      return this.mediaProvider.getUserDetail(id, type);
    }
  }
}
