import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the EditPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {
  sentData = {};
  formValid = false;
  title = '';
  description = '';
  id: number = this.navParams.get('file_id');
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');

  }
  // form check
  formCheck() {
    this.formValid = (this.title !== '') || (this.description !== '');
  }
  // modify post data
  modifyPost() {
    this.sentData = {};
    if(this.title !== '') {
      this.sentData['title'] = this.title;
    }
    if(this.description !== '') {
      this.sentData['description'] = this.description;
    }
    console.log(this.sentData);
    this.mediaProvider.editMedia(this.id,this.sentData).subscribe(res => {
      console.log(res);
      this.presentToast();
      this.navCtrl.pop().catch(err => console.log(err));
    })
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message:'Post Modified',
      duration: 3000,
    });

    toast.onDidDismiss(()=>{
      console.log('post modified toast');
    });

    toast.present();
  }
}
