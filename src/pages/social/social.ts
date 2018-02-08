import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data'
import { LoadingProvider } from '../../providers/loading/loading'
import { Http } from '@angular/http';


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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public http: Http,
    public afDB: AngularFireDatabase, 
    public dataProvider: DataProvider, 
    public loadingProvider: LoadingProvider) {
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
          translated: snap.payload.val().translated,
          translate: false
        })
      })
      this.feeds = feeds;
      this.lastKey = feeds[feeds.length-1].key;
    })
  }


  translate(feed){

    if(feed.translated != undefined){
      feed.translate = !feed.translate;
    }
    else {
      let body = {
        key: feed.key,
        text: feed.description
      };
      this.loadingProvider.show();
      this.http.post('https://us-central1-tianya-6d56d.cloudfunctions.net/translate', JSON.stringify(body))
      .subscribe((data) => {
        console.log('data', data);
        feed.translated = data.json().data;
        this.loadingProvider.hide();
      })
      feed.translate = !feed.translate;
    }
  }

  presentSocialCreate(){
    let createSocial = this.modalCtrl.create('SocialCreatePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createSocial.onDidDismiss(data => {
      if(data){
        this.ionViewDidLoad();
      }
      
    });
    createSocial.present();
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

  presentProfileModal() {
    let createModal = this.modalCtrl.create('ProfilePage', { userId: 8675309 }, {
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
            translated: snapshots[i].payload.val().translated,
            translate: false
          })
        }
        for(let i = 0; i<feeds.length; i++){
          this.feeds.push(feeds[i]);
        }
        console.log(feeds);
        this.lastKey = feeds[feeds.length-1].key;
        console.log(this.lastKey);
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
