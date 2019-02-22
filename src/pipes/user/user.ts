import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UserPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  transform(value: string) {
    return value + 'xxxx';
  }
}
