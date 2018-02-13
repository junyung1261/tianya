import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data'
import { LoadingProvider } from '../../providers/loading/loading'
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-community-detail',
  templateUrl: 'community-detail.html',
})
export class CommunityDetailPage {
  
  bulletRef: AngularFireObject<any>;
  accountRef: AngularFireObject<any>;
  feeds = [];
  user;
  count = 1;
  lastKey = '';
  bulletKey: any;
  communityName: any;
  bullet: any;
  reply = '';
  likeCount: any;
  commentFlag: number = 0;
  // testbullet : any;
  text = '';
  test;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public http: Http,
    public afDB: AngularFireDatabase,
    public dataProvider: DataProvider,
    public loadingProvider: LoadingProvider) {

   
    // Use snapshotChanges().map() to store the key
   
   
    // this.afDB.list(this.bulletDBName).valueChanges().subscribe(item => {
    //   this.testbullet = item;
    //   console.log("comments : ",this.testbullet);
    // });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityDetailPage');
    this.communityName = this.navParams.get('categoryName');
    this.bulletKey = this.navParams.get('bulletKey');
    this.user = firebase.auth().currentUser;
      
    this.bulletRef = this.afDB.object('/community/' + this.communityName + '/' + this.bulletKey);
    this.accountRef = this.afDB.object('/accounts/' +this.user.uid + '/comments');
  
    

    this.bulletRef.valueChanges().take(1).subscribe(item => {
      this.bullet = item;
      if(this.bullet.commentCount > 0)
      this.afDB.list('/comments/' + this.bulletKey).valueChanges().subscribe(comments => {
        this.bullet.comments = comments;
        this.bullet.commentCount = comments.length;
      });
    })
    
  }

  closeCommunityDetail() {
    this.navCtrl.pop();
  }

  translate(bullet) {
    

  }

  

  updateLike() {
    firebase.database().ref("community/" + this.communityName + "/" + this.bulletKey).child('like').transaction(function(currentLike){
      return currentLike+1;
    });
  }
  
  
  createComment() {
    // commentFlag == 1 : opened, ==0 : closed
    
      if ((this.reply.trim() != "")) {
        this.afDB.list("/comments/"+this.bulletKey).push({
          description: this.reply,
          writer: firebase.auth().currentUser.displayName,
          date: firebase.database['ServerValue'].TIMESTAMP
        }).then((success) => {
          this.accountRef.update({[success.key]: 'c' + this.bulletKey });
          this.bulletRef.update({commentCount: this.bullet.comments.length});
          this.reply='';
        })
      }
      else{
        alert("내용이 없습니다! : 댓글 불가")
      }

      this.commentFlag = 0;
    

  }
}
