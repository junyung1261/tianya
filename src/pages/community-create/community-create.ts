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
  specificRef: AngularFireList<any>;
  communityName: any;
  specificName : string;
  communityDBName: any;
  specificDB: any[] = [];
  checkList: any[] = ["false", "false", "false", "false", "false", "false"];
  title = '';
  text = '';
  images = [];
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public afDB: AngularFireDatabase, public dataProvider: DataProvider) {

    this.communityName = this.navParams.get('categoryName');
    this.communityDBName = "/community/".concat(this.communityName);
    this.communityRef = afDB.list(this.communityDBName);

    
    if (this.communityName.substring(0, 4) == "INFO") {
      this.checkInfoSpecific();
    }
    else if (this.communityName.substring(0, 4) == "LIFE") {
      this.checkLifeSpecific();
    }
    else if (this.communityName.substring(0, 4) == "TRAV") {
      this.checkTravelSpecific();
    }
    

    // if (this.communityName.substring(0, 4) == "INFO") {
    //   this.afDB.list('/category/0/category_inner', ref => ref).valueChanges().subscribe(Items => {
    //     this.specificDB = Items;
    //     console.log(this.specificDB)
    //   });
    // }
    // else if (this.communityName.substring(0, 4) == "LIFE") {
    //   this.afDB.list('/category/1/category_inner', ref => ref).valueChanges().subscribe(Items => {
    //     this.specificDB = Items;
    //   });
    // }
    // else if (this.communityName.substring(0, 4) == "TRAV") {
    //   this.afDB.list('/category/2/category_inner', ref => ref).valueChanges().subscribe(Items => {
    //     this.specificDB = Items;
    //   });
    // }
    console.log("categoryName :", this.navParams.get('categoryName'));
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
      title: title,
      description: text,
      type: this.specificName,
      writer: firebase.auth().currentUser.uid,
      date: firebase.database['ServerValue'].TIMESTAMP
    }).then((success) => {
      if (this.imageUpload.images.length > 0) {

        this.imageUpload.key = success.key;
        this.imageUpload.uploadImages("community/" + this.communityName);
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
    if ((this.text.trim() == "") || (this.text.trim() == null) || (this.title.trim() == null) || (this.title.trim() == "") || this.checkList[1] != undefined) return true;

    else return false;

  }

  determineSpecificRef(checkName: string) {
    console.log(checkName)
    this.specificName = checkName;

    this.checkList =[];
  }

  checkInfoSpecific() {
    // STUDY, KOREAN, FOOD, BEAUTY
    if(this.communityName.substring(5, 7) == "ST") {
      this.afDB.list('/category/0/category_inner/0/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "KO") {
      this.afDB.list('/category/0/category_inner/1/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "FO") {
      this.afDB.list('/category/0/category_inner/2/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "BE") {
      this.afDB.list('/category/0/category_inner/3/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
  }
  
  checkLifeSpecific() {
    // JOB, CLUB, TRAVEL, PROBLEM, BOARD
    if(this.communityName.substring(5, 7) == "JO"){
      this.afDB.list('/category/1/category_inner/0/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "CL"){
      this.afDB.list('/category/1/category_inner/1/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "TR"){
      this.afDB.list('/category/1/category_inner/2/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "PR"){
      this.afDB.list('/category/1/category_inner/3/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "BO"){
      this.afDB.list('/category/1/category_inner/4/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
  }

  checkTravelSpecific() {
    // USED, OVERSEAS, HOUSE
    if(this.communityName.substring(5, 7) == "US"){
      this.afDB.list('/category/2/category_inner/0/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "OV"){
      this.afDB.list('/category/2/category_inner/1/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if(this.communityName.substring(5, 7) == "HO"){
      this.afDB.list('/category/2/category_inner/2/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
  }



}