import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { DataProvider } from "../../providers/data/data"
import { ImageUpload } from "../../components/image-upload/image-upload";

@IonicPage()
@Component({
  selector: 'page-community-create',
  templateUrl: 'community-create.html',
})
export class CommunityCreatePage {

  @ViewChild(ImageUpload) imageUpload: ImageUpload;
  communityRef: AngularFireList<any>;
  accountRef: AngularFireObject<any>;
  communityName: any;
  specific_inner = [];
  selectedSpecific;
  title = '';
  text = '';
  
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public afDB: AngularFireDatabase, public dataProvider: DataProvider) {
    
    
  }

  ionViewDidLoad() {
    this.user = firebase.auth().currentUser;
    console.log('ionViewDidLoad CommunityCreatePage');
    this.communityName = this.navParams.get('categoryName');
    this.specific_inner = this.navParams.get('specific_inner');
    
    this.communityRef = this.afDB.list('/community/' + this.communityName);
    this.accountRef = this.afDB.object('/accounts/' +this.user.uid + '/community');
  }

  
  addCommunity(title: string, text: string) {
    text = text.replace(/\n/g, '<br>');

    // 경로만 불러와서 푸시하는 방식------------------------------
    this.communityRef.push({
      title: title,
      description: text,
      type: this.selectedSpecific,
      writer: firebase.auth().currentUser.displayName,
      date: firebase.database['ServerValue'].TIMESTAMP,
      like: 0,
      commentCount: 0,
      view: 0,
      
    }).then((success) => {
      if (this.imageUpload.images.length > 0) {

        this.imageUpload.key = success.key;
        this.imageUpload.uploadImages("community/" + this.communityName);
      }
      this.accountRef.update({[success.key]: this.communityName });
      this.viewCtrl.dismiss({ data: true });
      // this.addAddtions(success.key);
    })

  }

  // addAddtions(PostKey: any) {
  //   // 공사중 : 경로 문제 상의를 해야해

  //   firebase.database().ref("/additions/".concat(this.communityName)).push({
  //     like: 0,
  //     view: 0,
  //     commentsCount: 0,
  //     bulletKey: PostKey
  //   });
  // }

  // 아래 세개 함수 무쓸모. 그러나 다른곳에서 공부용으로 참조하고 있기 때문에 아직은 냅둡니다.
  updateItem(key: string, newText: string) {
    this.communityRef.update(key, { text: newText });

    // 경로만 지정하는건 이렇게 씁니다.
    // firebase.database().ref("/additions/".concat(this.communityName)+ "/" + key + "/text").update(newText);
  }
  deleteItem(key: string) {
    this.communityRef.remove(key);
  }
  deleteEverything() {
    this.communityRef.remove();
  }

  test(){
    console.log(this.selectedSpecific);
  }
  checkTrim() {
    if ((this.title.trim() == null) || (this.title.trim() == "") || this.selectedSpecific == null ||
    ((this.imageUpload.images.length == 0) && (this.text.trim() == "") || (this.text.trim() == null))) return true;

    else return false;

  }

  // determineSpecificRef(checkName: string) {
  //   console.log(checkName)
  //   this.specificName = checkName;

  //   this.checkList =[];
  // }

 

  


}