import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadPage } from '../upload/upload';
import { Observable } from "rxjs";
import { Pic } from "../../interfaces/Pic";
import { MediaProvider } from '../../providers/media/media';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  lost = true;
  picArray: Observable<Pic[]>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getAllFile();
  }
  ionViewwillEnter() {
    this.getAllFile();
  }
  // to navigate lost and found page
  goToOtherPage(){
    this.lost = !this.lost;
    this.getAllFile();
  }
  //go to upload page
  goToUpload() {
    this.navCtrl.push(UploadPage).catch(err => console.log(err));
  }
  // get all files
  getAllFile() {
    if(this.lost){
      this.picArray = this.mediaProvider.getAllMedia('lost');
    } else {
      this.picArray = this.mediaProvider.getAllMedia('found');
    }
    this.picArray.subscribe(res => console.log(res));
  }
}
