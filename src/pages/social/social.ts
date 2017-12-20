import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {

  feedsRef: AngularFireList<any>;
  feeds: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public afDB: AngularFireDatabase) {

  
  this.feedsRef = afDB.list('/feed');
  
  this.feeds = this.feedsRef.snapshotChanges().map(changes => {
    return changes.map(change => ({
      key: change.payload.key, 
      name: change.payload.val().name,
      image: change.payload.val().image, 
      description: change.payload.val().description, 
      imgProfile: change.payload.val().imgProfile, 
      like: change.payload.val().like, 
      postDate: change.payload.val().postDate, 
      startTime: change.payload.val().startTime, 
      title: change.payload.val().title, 
      images: afDB.list('/feed/'+change.key+'/images').valueChanges(),

    }))
    
  }); 
  
  

  

  
  }


  addItem(newName: string) {
    this.feedsRef.push({ text: newName });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');
  }

  presentCreateModal() {
    let createModal = this.modalCtrl.create('SocialCreatePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

}
