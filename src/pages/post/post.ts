import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, Popover, AlertController} from 'ionic-angular';
import { Pic } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';
import { Comm } from '../../interfaces/comment';
import { PopoverComponent } from "../../components/popover/popover";
import { DropdownpagePage } from "../dropdownpage/dropdownpage";

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
  comments: Comm[];
  userId: number;
  userName = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider,
              private popoverController: PopoverController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    // the specific post is passed to this so it gets its details
    this.post = this.navParams.get('post');
    console.log(this.post);
    console.log('ionViewDidLoad PostPage');
    this.getComments();
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.userName = localStorage.getItem('username');
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
  // delete comment by own user
  deleteComments(comment_id: number) {
    console.log('trying to delete comments id: ' + comment_id);
      this.mediaProvider.deleteComment(comment_id).subscribe(ans => {
        console.log(ans);
        this.getComments();
      })
  }
  // resolve a post
  resolvePost() {
    this.mediaProvider.addTag('resolved',this.post.file_id)
  }
  // remove a post
  removePost() {
    this.mediaProvider.deleteMedia(this.post.file_id).subscribe(res => {
      console.log(res);
      this.navCtrl.pop().catch(err => console.log(err));
    })
  }
  // refresh comments section
  doRefresh(event) {
    console.log('something happened');
    console.log(event);
    this.getComments();
    event.complete();
  }
  // testing alert
  // async alertDelete() {
  //   console.log('alert');
  //   const alert = await this.alertCtrl.create({
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }
  // test long press
  // longpress() {
  //   console.log('testing long press');
  // }
  // pressed() {
  //   console.log('pressed');
  // }
  // active() {
  //   console.log('active');
  // }
  // released() {
  //   console.log('released');
  // }
  // test pop over
  // presentPopover(ev: any) {
  //   const popover = this.popoverController.create(DropdownpagePage);
  //   popover.present({
  //     animate: true,
  //
  //   });
  // }
}
