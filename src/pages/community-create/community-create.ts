import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
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
  communityName : any;
  communityDBName : any;
  specificName : AngularFireList<any>;
  feeds: Observable<any[]>;
  title = '';
  text = '';
  images = [];
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public afDB: AngularFireDatabase, public dataProvider: DataProvider) {
      
    this.communityName = this.navParams.get('categoryName');
    console.log(this.navParams.get('categoryName'));
    this.communityDBName = "/community-".concat(this.communityName);
    this.communityRef = afDB.list(this.communityDBName);

    console.log("communityDBName :", this.communityDBName);
    console.log("communityRef :", this.communityRef);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityCreatePage');

    this.dataProvider.getCurrentUser().valueChanges().subscribe((user) => {

      this.user = user;
    });
  }

  addCommunity(title: string, text: string) {
    this.communityRef.push({
      title : title,
      description: text,
      writer: firebase.auth().currentUser.uid,
      date: firebase.database['ServerValue'].TIMESTAMP
    }).then((success) => {
      if (this.imageUpload.images.length > 0) {

        this.imageUpload.key = success.key;
        this.imageUpload.uploadImages("community-" + this.communityName);
      }
      this.viewCtrl.dismiss({ data: true });
    })




  }
  updateItem(key: string, newText: string) {
    this.communityRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.communityRef.remove(key);
  }
  deleteEverything() {
    this.communityRef.remove();
  }

  checkTrim() {
    if ((this.text.trim() == "") || (this.text.trim() == null) || (this.title.trim() == null) || (this.title.trim() =="")) return true;

    else return false;

  }



}
