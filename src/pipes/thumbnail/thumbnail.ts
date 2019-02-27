import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  transform(value: string, sizeOption) {
  // value is the initial filename. We split it and change the file extension to select which one we want.
    let thumbnail;
    const fileName = value.split(".")[0];
    console.log(fileName);
    switch (sizeOption) {
      case 'small':
        thumbnail = fileName + '-tn160.' +'png';
        break;

      case 'medium':
        thumbnail = fileName + '-tn320.' +'png';
        break;

      case 'large':
        thumbnail = fileName + '-tn640.' +'png';
        break;

      case 'screenshot':
        thumbnail = value;
        break;

      default:
        thumbnail = fileName + '-tn160.' +'png';
        break;
    }
    return 'http://media.mw.metropolia.fi/wbma/uploads/' + thumbnail;
  }
}
