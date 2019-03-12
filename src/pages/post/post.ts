import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Popover, AlertController, LoadingController } from 'ionic-angular';
import { Pic } from '../../interfaces/Pic';
import { MediaProvider } from '../../providers/media/media';
import { Comm } from '../../interfaces/comment';
import { MenuController } from 'ionic-angular';
import { PopoverComponent } from "../../components/popover/popover";
import { DropdownpagePage } from "../dropdownpage/dropdownpage";
import {EditPostPage} from "../edit-post/edit-post";
import {ConfirmPage} from "../confirm/confirm";
import {OtherUserPage} from "../other-user/other-user";
import {ProfilePage} from "../profile/profile";

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
  comments: Comm[] = [];
  userId: number;
  userName = '';
  popOverStatus = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider,
              private popoverController: PopoverController,
              private alertCtrl: AlertController,
              private menuCtrl: MenuController,
              private loadCtrl: LoadingController) {
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
    this.updatePost();
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
    this.presentConfirm('Delete').then(ans => {
      if(ans) {
        this.mediaProvider.deleteComment(comment_id).subscribe(ans => {
          console.log(ans);
          this.getComments();
        })
      }
    });
  }
  // resolve a post
  resolvePost() {
    this.presentConfirm('Resolve').then(ans => {
      if(ans) {
        this.mediaProvider.addTag('resolved',this.post.file_id).subscribe(ans => {
          console.log(ans);
          this.updatePost();
        });
      }
    })
  }
  // remove a post
  removePost() {
    this.presentConfirm('Remove').then(ans => {
      if(ans) {
        this.mediaProvider.deleteMedia(this.post.file_id).subscribe(res => {
          console.log(res);
          this.navCtrl.pop().catch(err => console.log(err));
        })
      }
    });
  }
  // edit post
  editPost() {
    this.navCtrl.push(EditPostPage,{'file_id': this.post.file_id}).catch(err => console.log(err));
  }
  // update post
  updatePost() {
    const uploadSpinner = this.loadCtrl.create({
      content: 'renewing data',
    });
    uploadSpinner.present().catch(err => console.log(err));
    this.mediaProvider.getSingleMedia(this.post.file_id).then((res: Pic) => {
      this.post = res;
      console.log(res);
      setTimeout(() => {
        uploadSpinner.dismiss().catch(error => console.log(error));
        console.log('timeout');
      }, 100)
    })
  }
  // refresh comments section
  doRefresh(event) {
    console.log('something happened');
    console.log(event);
    this.getComments();
    event.complete();
  }
  // popover menu
  presentPopover(ev: any) {
    localStorage.setItem('mem', 'do nothing');
    const popover = this.popoverController.create(
      DropdownpagePage,
      {'post_id':this.post.file_id, 'resolve_status': this.post.resolvedStatus},
      {
        showBackdrop: true,
        cssClass: 'popover-menu'
      });
    popover.present({
      animate: true,
      ev: ev,
    }).catch(err => console.log(err));
    popover.onDidDismiss(() => {
      let choice = localStorage.getItem('mem');
      console.log('user choice is:' + choice);
      switch (choice) {
        case 'do nothing':
          break;
        case 'resolve':
          this.resolvePost();
          break;
        case 'remove':
          this.removePost();
          break;
        case 'edit':
          this.editPost();
          break;
      }
    })
  }
  // ask for user confirmation
  presentConfirm(input: string) {
    return new Promise(resolve => {
      this.popOverStatus = true;
      const popover = this.popoverController.create(ConfirmPage,{'input': input}, {
        enableBackdropDismiss: false,
        showBackdrop: false,
      });
      popover.present({
        animate: true,
      }).catch(err => console.log(err));
      popover.onDidDismiss(() => {
        let choice = localStorage.getItem('confirm-ask');
        console.log('user choice is:' + choice);
        this.popOverStatus = false;
        switch (choice) {
          case 'no':
            resolve(false);
            break;
          case 'yes':
            resolve(true);
            break;
        }
      })
    });
  }
  // go to other's profile
  goToProfile(id: number) {
    if(id == this.userId) {
      this.navCtrl.push(ProfilePage).catch(err => console.log(err));
    } else {
      this.navCtrl.push(OtherUserPage, {'id' : id}).catch(err => console.log(err));
    }
  }
}
