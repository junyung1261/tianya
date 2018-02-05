import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
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

  count = 1;
  lastKey = '';
  bulletKey : any;
  bulletDBName : any;
  communityName: any;
  bullet : Observable<any>;
  bulletImage : Observable<any>;
  bulletRef : AngularFireList<any>;

  likeCount : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public http: Http,
    public afDB: AngularFireDatabase, 
    public dataProvider: DataProvider, 
    public loadingProvider: LoadingProvider) {

      this.communityName = this.navParams.get('categoryName');
      this.bulletKey = this.navParams.get('bulletKey');

      this.bulletDBName = "community/" + this.communityName + "/" + this.bulletKey;

      this.bullet = this.afDB.object(this.bulletDBName).valueChanges();
      this.bulletImage = this.afDB.object(this.bulletDBName + "/images").valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityDetailPage');
  }

  closeCommunityDetail(){
    this.navCtrl.pop();
  }

  translate(bullet){

  }

  updateLike() {
    // console.log("like : ", likeCount);
    this.afDB.list("community/"+ this.communityName).update(this.bulletKey, {like : 50});
  }
  
  createComment(){

  }

}
