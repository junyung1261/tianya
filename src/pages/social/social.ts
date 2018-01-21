import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DataProvider } from '../../providers/data/data'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

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
  feeds = [];
  count = 5;
  lastKey = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public afDB: AngularFireDatabase, public dataProvider: DataProvider) {

  
  this.feedsRef = afDB.list('/feed');
  
  
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');

    this.dataProvider.getFeeds(this.count,'').snapshotChanges().take(1).subscribe(snapshots => {
      let feeds = [];
      snapshots.forEach(snap => {
        feeds.unshift({
          key: snap.payload.key, 
          name: snap.payload.val().name,
          image: snap.payload.val().image, 
          description: snap.payload.val().description, 
          imgProfile: snap.payload.val().imgProfile, 
          like: snap.payload.val().like, 
          date: snap.payload.val().date, 
          startTime: snap.payload.val().startTime, 
          title: snap.payload.val().title, 
          images: this.afDB.list('/feed/'+snap.key+'/images').valueChanges().take(1),
        })
        
      })
      
      this.feeds = feeds;
      this.lastKey = feeds[feeds.length-1].key;
      
    })
  }


  


  presentCreateModal() {
    let createModal = this.modalCtrl.create('SocialCreatePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      if(data){
        this.ionViewDidLoad();
      }
      
    });
    createModal.present();
  }

  presentNoticeModal() {
    let createModal = this.modalCtrl.create('NoticePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

  presentDetailModal(categoryName) {
    let createModal = this.modalCtrl.create('SocialDetailPage', {'categoryName': categoryName}, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }



  

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    
    console.log('Begin async operation');
    console.log(this.lastKey);
    setTimeout(() => {
    this.count+=1;
     this.dataProvider.getFeeds(6,this.lastKey).snapshotChanges().take(1).subscribe(snapshots => {
    let feeds = [];

    for(let i = 0 ; i < snapshots.length-1; i++){
      feeds.unshift({
        key: snapshots[i].payload.key, 
        name: snapshots[i].payload.val().name,
        image: snapshots[i].payload.val().image, 
        description: snapshots[i].payload.val().description, 
        imgProfile: snapshots[i].payload.val().imgProfile, 
        like: snapshots[i].payload.val().like, 
        date: snapshots[i].payload.val().date, 
        startTime: snapshots[i].payload.val().startTime, 
        title: snapshots[i].payload.val().title, 
        images: this.afDB.list('/feed/'+snapshots[i].key+'/images').valueChanges().take(1),
      })
    }
    
   
    for(let i = 0; i<feeds.length; i++){
      this.feeds.push(feeds[i]);
    }
    console.log(feeds);
   
    this.lastKey = this.feeds[this.feeds.length-1].key;
    console.log(this.lastKey);
    
  })
  
  
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
