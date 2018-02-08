import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DataProvider } from '../../providers/data/data'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
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

    this.dataProvider.getFeeds(this.count,'').snapshotChanges().take(1).subscribe(feeds => {
      
      this.feeds = feeds.reverse();
      this.lastKey = this.feeds[this.feeds.length-1].key;
      
    })
  }


  translate(feed){
    
    if(feed.payload.val().translated != undefined){
      feed.translated = feed.payload.val().translated;
    }
    else if(feed.translated == undefined) {
      let body = {
        key: feed.key,
        text: feed.payload.val().description
      };
      this.loadingProvider.show();
      this.http.post('https://us-central1-tianya-6d56d.cloudfunctions.net/translate', JSON.stringify(body))
      .subscribe((data) => {
        console.log('data', data);
        feed.translated = data.json().data;        
        this.loadingProvider.hide();
       
      })
    }
    feed.translate = !feed.translate;
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
    
    setTimeout(() => {
      this.count+=1;
      this.dataProvider.getFeeds(6,this.lastKey).snapshotChanges().take(1).subscribe(feeds => {
        
        feeds.pop();
        this.feeds = this.feeds.concat(feeds.reverse());
        
        this.lastKey = this.feeds[this.feeds.length-1].key;
        
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
