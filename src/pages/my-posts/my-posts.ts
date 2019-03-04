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
  // allPicArray: Observable<Pic[]>;
  lostPicArray: Pic[];
  foundPicArray: Pic[];
  pet: string = "puppies";
  userId = localStorage.getItem('user_id');
  combineArrTemp: Pic[]= [];
  allPostArray:  Pic[];
  solvedPostArray:  Pic[];


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPostsPage');
    this.getAllMyFound();
    this.getAllMyLost();
  }

 /*  getAllMyPosts() {
    // console.log('my userId >>>>>', this.userId)
    this.allPicArray = this.mediaProvider.getUsersMedia(this.userId);
    this.allPicArray.subscribe(res => console.log('11111111',res));
    // console.log('array==>>>', this.allPicArray)
  }
 */
  //get all lost posts of a user
  getAllMyLost() {
    this.mediaProvider.getAllMedia('lost').then(
      (results: Pic[]) => {// gives all posts with lost tag
        console.log('lost posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.lostPicArray = results.filter((img) => {
          if (img.user_id.toString() === this.userId) {
            console.log('your lost img',img);
            this.combineArrTemp.push(img);
            return img;
          }
        });
        console.log('2combo after getAllMyLost >>>>>>>>>>>>>>>>', this.combineArrTemp);
        this.createAllArr();
      }
    )
  }

  getAllMyFound() {

    this.mediaProvider.getAllMedia('found').then(
      (results: Pic[]) => {// gives all posts with found tag
        console.log('found posts >>>>>>',results);

        //filter that for ones that were made by this user
        this.foundPicArray = results.filter((img) => {
          if (img.user_id.toString() === this.userId) {
            console.log('your found img',img);
            this.combineArrTemp.push(img);
            return img;
          }
        });
        this.createAllArr();
        console.log('1 combo after getAllMyFound >>>>>>>>>>>>>>>>', this.combineArrTemp);

      }
    );
  }

  // takes all components from lost and found arrays and REsorts them by time
  createAllArr() {
    this.allPostArray = this.mediaProvider.sortMedia(this.combineArrTemp);
    console.log('all array >>>>>>>>>>>>>>>>',this.allPostArray);


    setTimeout(()=>{
      this.solvedPostArray= this.allPostArray.filter( img => img.resolvedStatus === true);
      this.solvedPostArray = this.mediaProvider.sortMedia(this.solvedPostArray);
      console.log('A test filter for the tag', this.solvedPostArray);
    },1500)


    /* this.solvedPostArray = this.allPostArray.filter((img: Pic) => {
      console.log('img.tags ',img.tags);
      console.log('resolved should be the tag');
      console.log('We have come this far', img);

       return img.tags.filter( item => item.tag ==='resolved');
    });*/
  }

}
