import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { PhotoLibrary } from '@ionic-native/photo-library';

/**
 * Generated class for the SocialCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-soc9ial-create',
  templateUrl: 'social-create.html',
})
export class SocialCreatePage {

  feedsRef: AngularFireList<any>;
  feeds: Observable<any[]>;
  text = '';
  images = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, 
              public afDB: AngularFireDatabase, public photoLibrary: PhotoLibrary) {

    this.feedsRef = afDB.list('/feed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
  }
  

  addFeed(text: string) {
    this.feedsRef.push({
        description: text,
        writer: firebase.auth().currentUser.uid,
        date: firebase.database['ServerValue'].TIMESTAMP
      }).then((success) => {
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

  getPictures(){ 
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
            this.images.push(libraryItem);
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
    
  }
}
