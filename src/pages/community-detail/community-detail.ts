import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DataProvider } from '../../providers/data/data'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { LoadingProvider } from '../../providers/loading/loading'
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-community-detail',
  templateUrl: 'community-detail.html',
})
export class CommunityDetailPage {

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
    console.log('ionViewDidLoad CommunityDetailPage');
  }

  closeCommunityDetail(){
    this.navCtrl.pop();
  }

  translate(feed){

  }

}
