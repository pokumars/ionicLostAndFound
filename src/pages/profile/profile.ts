import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MediaProvider } from '../../providers/media/media';
import { TagsResponse } from '../../interfaces/Pic';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  baseUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';
  username = localStorage.getItem('username');
  userMail = localStorage.getItem('email');
  userId = localStorage.getItem('user_id');
  avatar = '';
  avatarUrl: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app: App,
              private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  ngOnInit() {
    this.getProfilePic();
  }

  getProfilePic() {
    this.mediaProvider.getAvatar('profile').subscribe((item: TagsResponse[]) => {
      // gets back an array of all items with the tag 'profile'.
      item.filter((a) => {

        // search the array for the specific one that has my userId
        if (a.user_id.toString() === this.userId){

          // use the filename of that as the file name to be passed to html.
          this.avatar = a.filename;
          console.log('avatar ---->', this.avatar)
          //this.avatarUrl = this.baseUrl + this.avatar;
          console.log('a.filename is ', a.filename);

          this.avatarUrl = a.filename.split(".")[0] + '-tn160.' +'png';
        }
      })
    }, error => console.log(error))
  }

  onLogout(){
    console.log('onLogout()');
    localStorage.clear();

    // set root to be the login Page
    this.app.getRootNav().setRoot(LoginPage);
  }

}
