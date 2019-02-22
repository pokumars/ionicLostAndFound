import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pic } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  post: Pic;
  comment = '';
  comments = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.post = this.navParams.get('post');
    console.log('ionViewDidLoad PostPage');
    this.getComments();
  }
  ionViewWillEnter() {
    this.post = this.navParams.get('post');
    console.log(this.post.filename);
    this.getComments();
  }
  // send comment
  sendComment() {
    this.mediaProvider.sendComment(this.comment, this.post.file_id).subscribe(res => {
      console.log(res);
      this.comment = '';
      this.getComments();
    })
  }
  // get comments
  getComments() {
    this.mediaProvider.getComment(this.post.file_id).subscribe(ans => {
      console.log('xxxx');
      console.log(ans);
      this.comments = ans;
    })
  }
}
