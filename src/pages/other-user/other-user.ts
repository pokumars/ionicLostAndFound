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
  lostPicArray: Pic[];
  foundPicArray: Pic[];
  allPostArray:  Pic[];
  combineArrTemp: Pic[]= [];
  solvedPostArray:  Pic[];

  userId = 5;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserPage');
    this.userId = this.navParams.get('id');
    this.getAllMyLost();
    this.getAllMyFound();
  }
  // getAllMyPosts() {
  //   // console.log('my userId >>>>>', this.userId)
  //   this.mediaProvider.getUsersMedia(this.userId.toString()).subscribe((res: Pic[]) => this.allPostArray = res);
  //   // console.log('array==>>>', this.allPicArray)
  // }

  getAllMyLost() {
    this.mediaProvider.getAllMedia('lost').then(
      (results: Pic[]) => {// gives all posts with lost tag
        console.log('lost posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.lostPicArray = results.filter((img) => {
          if (img.user_id === this.userId) {
            console.log('your lost img',img);
            this.combineArrTemp.push(img);
            return img;
          }
        });
        console.log('2combo after getAllMyLost ......................', this.combineArrTemp);
        // sort array by time
        this.lostPicArray = this.mediaProvider.sortMedia(this.lostPicArray);

        // setup the array containing all myposts. add lost and ound and sort by time
        this.createAllArr();
      }
    )
  }

  getAllMyFound() {
    this.mediaProvider.getAllMedia('found').then(
      (results: Pic[]) => {// gives all posts with found tag
        console.log('found posts ........ ',results);

        //filter that for ones that were made by this user
        this.foundPicArray = results.filter((img) => {
          if (img.user_id === this.userId) {
            console.log('your found img',img);
            this.combineArrTemp.push(img);
            return img;
          }
        });

        // sort array by time
        this.foundPicArray = this.mediaProvider.sortMedia(this.foundPicArray);

        // setup the array containing all myposts. add lost and ound and sort by time
        this.createAllArr();
        console.log('1 combo after getAllMyFound ............................', this.combineArrTemp);
      }
    );
  }

  // takes all components from lost and found arrays and REsorts them by time
  createAllArr() {
    this.allPostArray = this.mediaProvider.sortMedia(this.combineArrTemp);
    console.log('all array .............', this.allPostArray);


    setTimeout(()=>{
      this.solvedPostArray= this.allPostArray.filter( img => img.resolvedStatus === true);
      this.solvedPostArray = this.mediaProvider.sortMedia(this.solvedPostArray);
      console.log('A test filter for the tag', this.solvedPostArray);
    },500)
  }
  // go to detailed post
  goToDetailed(post: Pic) {
    this.navCtrl.push(PostPage,{'post': post}).catch(err => console.log(err));
  }
}
