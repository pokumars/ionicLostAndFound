import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MediaProvider } from '../../providers/media/media';
import {Pic, TagsResponse} from '../../interfaces/Pic';
import { unescape } from "querystring";
import { ProfileEditPage } from "../profile-edit/profile-edit";
import { Chooser } from '@ionic-native/chooser';
import { LoadingController } from 'ionic-angular';
import { MyPostsPage } from '../my-posts/my-posts';
import {Observable} from "rxjs";
import {PostPage} from "../post/post";

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

  // concerning the posts
  type: string = "all";
  allPicArray: Observable<Pic[]>;
  lostPicArray: Pic[];
  foundPicArray: Pic[];

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
    this.getAllMyPosts();
    this.getAllMyLost();
    this.getAllMyFound()
  }
  // log user out
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
    const uploadSpinner = this.loadCtrl.create({
      content: 'uploading to server',
    });
    this.chooser.getFile('image/*').then(res => {
      //showing spinner
      let token = localStorage.getItem('token');
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
            this.mediaProvider.getSingleMedia(this.avatarId).then((answer: Pic) => {
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
              this.mediaProvider.getSingleMedia(this.avatarId).then((answer: Pic) => {
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
    }).catch(err => {
      console.log(err);
      uploadSpinner.dismiss().catch(error => console.log(error));
    });
  }
  // getting users post
  getAllMyPosts() {
    // console.log('my userId >>>>>', this.userId)
    this.allPicArray = this.mediaProvider.getUsersMedia(this.userId.toString());
    this.allPicArray.subscribe(res => console.log('11111111',res));
    // console.log('array==>>>', this.allPicArray)
  }

  //get all lost posts of a user
  getAllMyLost() {
    this.mediaProvider.getAllMedia('lost').then(
      (results: Pic[]) => {// gives all posts with lost tag
        console.log('lost posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.lostPicArray = results.filter((img) => {
          if (img.user_id === this.userId) {
            console.log('your lost img',img);
            return img;
          }
        })
      }
    )
  }
  // get all post tagged with found
  getAllMyFound() {
    this.mediaProvider.getAllMedia('found').then(
      (results: Pic[]) => {// gives all posts with found tag
        console.log('found posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.foundPicArray = results.filter((img) => {
          if (img.user_id === this.userId) {
            console.log('your found img',img);
            return img;
          }
        });

      }
    );
  }
  // go to detailed post
  goToDetailed(post: Pic) {
    this.navCtrl.push(PostPage,{'post': post}).catch(err => console.log(err));
  }
  // check if user already have avatar
}
