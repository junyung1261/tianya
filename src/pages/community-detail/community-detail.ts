import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data'
import { LoadingProvider } from '../../providers/loading/loading'
import { Http } from '@angular/http';
import * as firebase from 'firebase';


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
  // testbullet : any;
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
      console.log("bullet : ", this.bullet);
    });
    // this.afDB.list(this.bulletDBName).valueChanges().subscribe(item => {
    //   this.testbullet = item;
    //   console.log("comments : ",this.testbullet);
    // });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityDetailPage');
    firebase.database().ref(this.bulletDBName).child('view').transaction(function(currentView){
      return currentView+1;
    });
  }

  closeCommunityDetail() {
    this.navCtrl.pop();
  }

  translate(bullet) {
    

  }

  

  updateLike() {
    firebase.database().ref(this.bulletDBName).child('like').transaction(function(currentLike){
      return currentLike+1;
    });
  }
  

  createComment() {
    // commentFlag == 1 : opened, ==0 : closed
    if (this.commentFlag == 1) {
      if ((this.text.trim() != "")) {
        firebase.database().ref(this.bulletDBName+"/comments").push({
          description: this.text,
          writer: firebase.auth().currentUser.uid,
          date: firebase.database['ServerValue'].TIMESTAMP
        }).then((success) => {
          firebase.database().ref(this.bulletDBName).child('commentCount').transaction(function(currentCount){
            return currentCount+1;
          });
          this.text=null;
        })
      }
      else{
        alert("내용이 없습니다! : 댓글 불가")
      }

      this.commentFlag = 0;
    }
    else if (this.commentFlag == 0) {
      this.commentFlag = 1;
      
    }

  }
}
