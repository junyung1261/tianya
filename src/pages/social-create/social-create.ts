import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from "../../providers/data/data"
import { ImageUpload } from "../../components/image-upload/image-upload";



@IonicPage()
@Component({
  selector: 'page-social-create',
  templateUrl: 'social-create.html',
})
export class SocialCreatePage {
  @ViewChild(ImageUpload) imageUpload: ImageUpload;
  feedsRef: AngularFireList<any>;
  accountRef: AngularFireObject<any>;
  feeds: Observable<any[]>;
  text = '';
  images = [];
  user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public afDB: AngularFireDatabase, 
    public dataProvider: DataProvider) {
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
    this.dataProvider.getCurrentUser().snapshotChanges().subscribe((user) => {
      this.user = user;
      this.accountRef = this.afDB.object('/accounts/' +this.user.key + '/feeds')
    });
    this.feedsRef = this.afDB.list('/feed');
  }

  addFeed(text: string) {
    this.feedsRef.push({
      description: text,
      name: firebase.auth().currentUser.displayName,
      profileImg: firebase.auth().currentUser.photoURL,
      date: firebase.database['ServerValue'].TIMESTAMP
    }).then((success) => {
      if(this.imageUpload.images.length > 0){
        
        this.imageUpload.key = success.key;
        this.imageUpload.uploadImages('feed');
      }
      this.accountRef.update({[success.key]:true});
      this.viewCtrl.dismiss({data: true});
    })
  }

  updateItem(key: string, newText: string) {
    this.feedsRef.update(key, { text: newText });
  }

  deleteItem(key: string) {    
    this.feedsRef.remove(key); 
  }

  deleteEverything() {
    this.feedsRef.remove();
  }

  checkTrim(){
    if ( (this.text.trim() == "" ) || (this.text.trim() == null) )return true;
    else return false;
  }
  
}
