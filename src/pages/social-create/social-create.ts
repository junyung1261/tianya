import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public afDB: AngularFireDatabase) {

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
  
}
