import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/Pic';

/**
 * Generated class for the MyPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {
  type: string = "all";
  allPicArray: Observable<Pic[]>;
  lostPicArray: Pic[];
  foundPicArray: Pic[];
  pet: string = "puppies";
  userId = localStorage.getItem('user_id')

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPostsPage');
    this.getAllMyPosts();
    this.getAllMyLost();
    this.getAllMyFound();
  }

  getAllMyPosts() {
    // console.log('my userId >>>>>', this.userId)
    this.allPicArray = this.mediaProvider.getUsersMedia(this.userId);
    this.allPicArray.subscribe(res => console.log('11111111',res));
    // console.log('array==>>>', this.allPicArray)
  }

  //get all lost posts of a user
  getAllMyLost() {
    this.mediaProvider.getAllMedia('lost').subscribe(
      (results) => {// gives all posts with lost tag
        console.log('lost posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.lostPicArray = results.filter((img) => {
          if (img.user_id.toString() === this.userId) {
            console.log('your lost img',img);
            return img;
          }
        })
      }
    )
  }
  getAllMyFound() {

    this.mediaProvider.getAllMedia('found').subscribe(
      (results: Pic[]) => {// gives all posts with found tag
        console.log('found posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.foundPicArray = results.filter((img) => {
          if (img.user_id.toString() === this.userId) {
            console.log('your found img',img);
            return img;
          }
        });

      }
    );



  }









}
