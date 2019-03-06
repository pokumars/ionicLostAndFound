import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import {Observable} from "rxjs";
import {Pic} from "../../interfaces/Pic";
import {PostPage} from "../post/post";

/**
 * Generated class for the OtherUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-user',
  templateUrl: 'other-user.html',
})
export class OtherUserPage {
  type: string = "all";
  allPicArray: Observable<Pic[]>;
  lostPicArray: Pic[];
  foundPicArray: Pic[];

  userId = 5;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserPage');
    this.userId = this.navParams.get('id');
    this.getAllMyPosts();
    this.getAllMyLost();
    this.getAllMyFound();
  }
  getAllMyPosts() {
    // console.log('my userId >>>>>', this.userId)
    this.allPicArray = this.mediaProvider.getUsersMedia(this.userId.toString());
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
}
