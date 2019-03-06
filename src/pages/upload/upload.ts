import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Chooser } from '@ionic-native/chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { unescape} from "querystring";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  filename = '';
  title = '';
  description = '';
  file: File;
  fileValid: boolean; titleValid: boolean; descriptionValid: boolean;
  fileInput = false;
  formData: FormData;
  isImage = false; isAudio = false; isVideo = false;
  pathToFile = '';
  brightness = 100; contrast = 100; saturation = 100; sepia = 0;
  filter = 'matrix';
  // chooser specific thing
  chosenFile: Blob;
  // knowing your platform
  isWindows = false;
  isAndroid = false;
  cameraOpt: CameraOptions;
  choice = 'lost';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider,
              private loadCtrl: LoadingController,
              private chooser: Chooser,
              private platform: Platform,
              private toastCtrl: ToastController,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    this.cameraOpt = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    if (this.platform.is('android')) {
      this.isAndroid = true;
    } else {
      this.isWindows = true;
    }
    console.log('ionViewDidLoad UploadPage');
  }
  // upload file
  uploadFile() {
    const uploadSpinner = this.loadCtrl.create({
      content: 'uploading to server',
    });
    uploadSpinner.present().catch(err => console.log(err));
    console.log('uploading this');
    this.formData = new FormData();
    if (this.isAndroid) {
      this.formData.append('file', this.chosenFile);
    } else {
      console.log('using this');
      this.formData.append('file', this.file);
    }
    this.formData.append('title', this.title);
    this.formData.append('description', this.description);
    // -------------------get token and send file to server
    let token = localStorage.getItem('token');
    console.log(token);
    // send avatar
    this.mediaProvider.sendMedia(this.formData, token).subscribe(res => {
      console.log(res.file_id);
      // set 'profile' tag to avatar here
      this.mediaProvider.addTag(this.choice,res.file_id).subscribe(ans => {
        console.log(ans);
          setTimeout(() => {
            uploadSpinner.dismiss().catch(error => console.log(error));
            console.log('timeout');
            this.navCtrl.pop().catch(err => console.log(err));
          }, 500)
      });
    });
  }
  // check file using chooser
  choose() {
    this.chooser.getFile('image/*,audio/*,video/*').then(res => {
      this.fileInput = true;
      console.log(res);
      this.filename = res.name;
      this.isAudio = res.mediaType.substring(0, 5) === 'audio';
      this.isVideo = res.mediaType.substring(0, 5) === 'video';
      this.isImage = res.mediaType.substring(0, 5) === 'image';
      this.fileValid = this.isImage || this.isVideo || this.isAudio;
      if (this.fileValid) {
        this.chosenFile = new Blob([res.data], { type: res.mediaType });
        this.presentToast();
      }
      console.log(this.chosenFile);
      this.pathToFile = res.dataURI;
      console.log(this.pathToFile);
    }).catch(err => console.log(err));
  }
  // check file content using normal way
  checkFile(event: any) {
    this.pathToFile = '';
    this.fileInput = true;
    console.log(event.target.files[0].type.substring(0, 5));
    this.fileValid = event.target.files[0].type.substring(0, 5) === 'video' || event.target.files[0].type.substring(0, 5) === 'image' || event.target.files[0].type.substring(0, 5) === 'audio';
    this.isAudio = event.target.files[0].type.substring(0, 5) === 'audio';
    this.isVideo = event.target.files[0].type.substring(0, 5) === 'video';
    this.isImage = event.target.files[0].type.substring(0, 5) === 'image';
    if (this.fileValid) {
      this.file = event.target.files[0];
      console.log('file assigned');
      console.log(this.file);
      const reader = new FileReader();
      reader.onloadend = (evt) => {
        console.log('read success');
        // @ts-ignore
        console.log(evt.target.result);
        // @ts-ignore
        this.pathToFile = evt.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // title checking not null
  checkTitle() {
    this.titleValid = this.title !== '';
  }
  // description checking not null
  checkDesc() {
    this.descriptionValid = this.description !== '';
  }
  // junolize the image

  // normalize pic
  normalize() {
    this.brightness = 100;
    this.contrast = 100;
    this.saturation = 100;
    this.sepia = 0;
    this.filter = 'matrix';
  }
  // convert dataurl to blob
  dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    byteString = dataURI.split(',')[0].indexOf('base64') >= 0 ? atob(dataURI.split(',')[1]) : unescape(dataURI.split(',')[1]);
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  // camera stuff
  takePic() {
    console.log('taking pic');
    this.camera.getPicture(this.cameraOpt).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.isImage = true;
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData);
      this.pathToFile = base64Image;
      this.chosenFile = this.dataURItoBlob(base64Image);
      console.log(this.chosenFile);
      this.fileValid = true;
      if (this.fileValid) this.presentToast();
      this.isImage = true;
    }, (err) => {
      console.log(err);
    });
  }
  // checking found lost choice value
  checkChoice() {
    console.log(this.choice);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message:'File Selected',
      duration: 2000,
    });

    toast.onDidDismiss(()=>{
      console.log('dismissed image selected toast');
    });

    toast.present();
  }
}
