import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
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
  bulletKey: any;
  bulletDBName: any;
  communityName: any;
  bullet: any;
  bulletImage: Observable<any>;
  bulletRef: AngularFireList<any>;

  likeCount: any;
  commentFlag: number = 0;

  text = '';

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

    this.afDB.object(this.bulletDBName).valueChanges().subscribe(item => {
      this.bullet = item;
      console.log(this.bullet);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityDetailPage');
    //this.afDB.list("community/" + this.communityName).update(this.bulletKey, {view : 10});
  }

  closeCommunityDetail() {
    this.navCtrl.pop();
  }

  translate(bullet) {

  }

  

  updateLike() {
    // this.afDB.list("community/" + this.communityName).update(this.bulletKey, { like: 50 });
  }

  createComment() {
    // commentFlag == 1 : opened, ==0 : closed
    if (this.commentFlag == 1) {
      if ((this.text.trim() != "") || (this.text.trim() != null)) {
        // 아래 comment가 유저 아이디로 넘어가야하고, textarea가 refresh 되야 하며, 여러개의 커맨트 작성이 가능해야한다.
        // 폴더형식은 comments => 안에 순서대로 들어가며 속성으로 userID와 내용 및 날짜가 들어간다.
        // push로 만들어야 하며, transaction이 들어가도록 한다. 또한 comment 등록시 comment 갯수도 증가하도록 진행한다.
        this.afDB.list(this.bulletDBName).update("comments", { comment: this.text });
      }

      this.commentFlag = 0;
    }
    else if (this.commentFlag == 0) {
      this.commentFlag = 1;
    }

  }
}
