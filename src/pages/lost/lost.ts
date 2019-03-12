import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UploadPage } from '../upload/upload';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from "rxjs";
import { Pic } from "../../interfaces/Pic";
import { PostPage } from '../post/post';
import { OtherUserPage } from "../other-user/other-user";


/**
 * Generated class for the LostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {
  profilePage = ProfilePage;
  uploadPage = UploadPage;
  homePage = HomePage;
  lost = true;
  picArray: {};
  userid: number;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostPage');
    this.getAllFile();
    this.userid = +localStorage.getItem('user_id');
  }

  ionViewWillEnter() {
    this.getAllFile();
    this.userid = +localStorage.getItem('user_id');
  }
  getAllFile() {
    if(this.lost){
      this.picArray = this.mediaProvider.getAllMedia('lost');
    }
  }

  // go to detailed post
  goToDetailed(post: Pic) {
    this.navCtrl.push(PostPage,{'post': post}).catch(err => console.log(err));
  }
  // refresh page
  doRefresh(event) {
    console.log('something happened');
    console.log(event);
    this.getAllFile();
    event.complete();
  }
  // go to profile page
  goToProfile() {
    console.log('pushing');
    this.navCtrl.push(ProfilePage).catch(err => console.log(err));
  }
  goToUserProfile(id: number) {
    if(id == this.userid) {
      this.navCtrl.push(ProfilePage).catch(err => console.log(err));
    } else {
      this.navCtrl.push(OtherUserPage, {'id' : id}).catch(err => console.log(err));
    }
  }
}
