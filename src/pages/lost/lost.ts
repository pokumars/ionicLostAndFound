import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UploadPage } from '../upload/upload';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from "rxjs";
import { Pic } from "../../interfaces/Pic";
import { PostPage } from '../post/post';


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
  picArray: Observable<Pic[]>;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostPage');
    this.getAllFile();
  }

  ionViewWillEnter() {
    this.getAllFile();
  }
  getAllFile() {
    if(this.lost){
      this.picArray = this.mediaProvider.getAllMedia('lost');
    }
    this.picArray.subscribe(res => console.log(res));
  }

  // go to detailed post
  goToDetailed(post: Pic) {
    this.navCtrl.push(PostPage,{'post': post}).catch(err => console.log(err));
  }

}
