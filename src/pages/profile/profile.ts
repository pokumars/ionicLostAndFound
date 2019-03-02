import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MediaProvider } from '../../providers/media/media';
import { TagsResponse } from '../../interfaces/Pic';
import { unescape } from "querystring";
import { ProfileEditPage } from "../profile-edit/profile-edit";
import { Chooser } from '@ionic-native/chooser';
import { LoadingController } from 'ionic-angular';
import { MyPostsPage } from '../my-posts/my-posts';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  baseUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';
  userId: number;
  username = '';  userMail = '';  avatar = '';
  avatarId: number;  avatarUrl: string;
  chosenFile: Blob; formData: FormData;
  file: File;
  isAndroid = false; isWindows = false; isImage = false;
  myPosts = MyPostsPage;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app: App,
              private mediaProvider: MediaProvider,
              private chooser: Chooser,
              private loadCtrl: LoadingController,
              private platform: Platform) {
  }

  ionViewDidLoad() {
    this.updateUserData();
    console.log('ionViewDidLoad ProfilePage');
    if (this.platform.is('android')) {
      this.isAndroid = true;
    } else {
      this.isWindows = true;
    }
  }
  ionViewWillEnter() {
    this.updateUserData();
    console.log('user id is: ' + this.userId);
    // this.getProfilePic();
  }
  // update data
  updateUserData() {
    this.userId = +localStorage.getItem('user_id');// the plus to convert userid to number to be used in user info pipe
    this.username = localStorage.getItem('username');
    this.userMail = localStorage.getItem('email');
  }
  //get profile pic
  // getProfilePic() {
  //   this.mediaProvider.getAvatar('profile').subscribe((item: TagsResponse[]) => {
  //     // gets back an array of all items with the tag 'profile'.
  //     item.filter((a) => {
  //       // search the array for the specific one that has my userId
  //       if (a.user_id.toString() === this.userId){
  //         // use the filename of that as the file name to be passed to html.
  //         this.avatarId = a.file_id;
  //         this.avatar = a.filename;
  //         console.log('avatar ---->', this.avatar);
  //         //this.avatarUrl = this.baseUrl + this.avatar;
  //         console.log('a.filename is ', a.filename);
  //         this.avatarUrl = a.filename.split(".")[0] + '-tn160.' +'png';
  //       }
  //       else {
  //         this.avatar = '62b4a67c2d87d891a6eae477866320d6.png';
  //       }
  //     })
  //   }, error => console.log(error))
  // }
  //
  onLogout(){
    console.log('onLogout()');
    localStorage.clear();
    // set root to be the login Page
    this.app.getRootNav().setRoot(LoginPage).catch(err => console.log(err));
  }
  // go to edit profile page
  editProfile() {
    this.navCtrl.push(ProfileEditPage).catch(err => console.log(err));
  }
  // choose new profile pic and delete old profile pic
  chooseNewProfile() {
    this.chooser.getFile('image/*').then(res => {
      //showing spinner
      let token = localStorage.getItem('token');
      const uploadSpinner = this.loadCtrl.create({
        content: 'uploading to server',
      });
      uploadSpinner.present().catch(err => console.log(err));
      console.log('uploading this');
      console.log(res);
      console.log('id of avatar: ' + this.avatarId);
      this.isImage = res.mediaType.substring(0, 5) === 'image';
      // check if avatar exists
      if (this.avatar === '62b4a67c2d87d891a6eae477866320d6.png') {
        console.log('uploading new avatar');
        this.chosenFile = new Blob([res.data], { type: res.mediaType });
        if (this.isImage) {
          this.formData = new FormData();
          if (this.isAndroid) {
            console.log('yyyyyyyyy');
            this.formData.append('file', this.chosenFile);
          } else {
            console.log('using this');
            this.formData.append('file', this.file);
          }
          this.formData.append('title', 'avatar');
          this.mediaProvider.sendMedia(this.formData, token).subscribe(response => {
            console.log(response);
            this.avatarId = response.file_id;
            this.mediaProvider.getSingleMedia(this.avatarId).subscribe(answer => {
              console.log('this is the answer: ');
              console.log(answer);
              this.avatar = answer.filename;
              // set profile tag to media here
              this.mediaProvider.addTag('profile',response.file_id).subscribe(ans => {
                console.log(ans);
                setTimeout(() => {
                  // this.getProfilePic();
                  uploadSpinner.dismiss().catch(error => console.log(error));
                  console.log('timeout');
                }, 500)
              });
            });

          });
        }
      } else {
        console.log('uploading new avatar by replacing old one');
        this.mediaProvider.deleteMedia(this.avatarId).subscribe(()=>{
          if (this.isImage) {
            this.chosenFile = new Blob([res.data], { type: res.mediaType });
            this.formData = new FormData();
            if (this.isAndroid) {
              console.log('yyyyyyyyy');
              this.formData.append('file', this.chosenFile);
            } else {
              console.log('using this');
              this.formData.append('file', this.file);
            }
            this.formData.append('title', 'avatar');
            this.mediaProvider.sendMedia(this.formData, token).subscribe(response => {
              console.log(response);
              this.avatarId = response.file_id;
              this.mediaProvider.getSingleMedia(this.avatarId).subscribe(answer => {
                console.log('this is the answer: ');
                console.log(answer);
                this.avatar = answer.filename;
                // set profile tag to media here
                this.mediaProvider.addTag('profile',response.file_id).subscribe(ans => {
                  console.log(ans);
                  setTimeout(() => {
                    // this.getProfilePic();
                    uploadSpinner.dismiss().catch(error => console.log(error));
                    console.log('timeout');
                  }, 500)
                });
              });
            });
          }
        })
      }
      // send avatar over if file valid
    }).catch(err => console.log(err));
  }
  // check if user already have avatar
}
