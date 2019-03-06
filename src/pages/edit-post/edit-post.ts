import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { DropdownpagePage } from "../dropdownpage/dropdownpage";
import {ConfirmPage} from "../confirm/confirm";

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
              private popoverCtrl: PopoverController) {
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
      this.navCtrl.pop().catch(err => console.log(err));
    })
  }
  // cancel
  cancelModifyPost() {
    this.navCtrl.pop().catch(err => console.log(err));
  }
  // ask for user confirmation
  presentPopover(ev: any) {
    const popover = this.popoverCtrl.create(ConfirmPage,{'input': 'Edit'}, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    popover.present({
      animate: true,
    }).catch(err => console.log(err));
    popover.onDidDismiss(() => {
      let choice = localStorage.getItem('confirm-ask');
      console.log('user choice is:' + choice);
      switch (choice) {
        case 'no':
          break;
        case 'yes':
          this.modifyPost();
          break;
      }
    })
  }
}