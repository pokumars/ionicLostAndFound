import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UploadPage } from '../upload/upload';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';
import { PostPage } from '../post/post';
import { isEmpty } from 'rxjs/operator/isEmpty';

/**
 * Generated class for the FoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {
  profilePage = ProfilePage;
  uploadPage = UploadPage;
  homePage = HomePage;
  lost = false;
  picArray: {};
  testArr: {};

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private mediaProvider: MediaProvider,
     private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
    this.getAllFile();

    setTimeout(()=> {
      if(this.picArray === undefined){
        console.log('picArray test success', this.picArray)
        this.presentToast();

      } else{
        console.log('picArray fail', this.picArray)
      }
    }, 3000);
  }

  ionViewWillEnter() {
    this.getAllFile();
  }

  // get all files
  getAllFile() {
    if(!this.lost){
      this.picArray = this.mediaProvider.getAllMedia('found');
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
  toProfilePage(){
     // this.navCtrl.setRoot(ProfilePage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message:'Your internet connection may be down. Please refresh',
      showCloseButton: true,
      position: 'bottom'
    });

    toast.onDidDismiss(()=>{
      console.log('internet down selected toast');
    });

    toast.present();
  }

}
