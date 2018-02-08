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
  additionRef: string;
  communityName: any;
  specificName: string;
  communityDBName: any;
  specificDB: any[] = [];
  checkList: any[] = ["false", "false", "false", "false", "false", "false", "false"];
  title = '';
  text = '';
  images = [];
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public afDB: AngularFireDatabase, public dataProvider: DataProvider) {

    this.communityName = this.navParams.get('categoryName');
    this.communityDBName = "/community/".concat(this.communityName);

    // 기존 리스트를 불러와서 푸시하는 방식
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
    // 기존 리스트를 불러와서 푸시하는 방식
    // this.communityRef.push({
    //   title: title,
    //   description: text,
    //   type: this.specificName,
    //   writer: firebase.auth().currentUser.uid,
    //   date: firebase.database['ServerValue'].TIMESTAMP,
    //   like: 0,
    //   view : 0,
    // }).then((success) => {
    //   if (this.imageUpload.images.length > 0) {

    //     this.imageUpload.key = success.key;
    //     this.imageUpload.uploadImages("community/" + this.communityName);
    //   }
    //   this.viewCtrl.dismiss({ data: true });
    //   this.addAddtions();
    // })

    // 경로만 불러와서 푸시하는 방식------------------------------
    firebase.database().ref(this.communityDBName).push({
      title: title,
      description: text,
      type: this.specificName,
      writer: firebase.auth().currentUser.uid,
      date: firebase.database['ServerValue'].TIMESTAMP,
      like: 0,
      commentCount: 0,
      view: 0,
      
    }).then((success) => {
      if (this.imageUpload.images.length > 0) {

        this.imageUpload.key = success.key;
        this.imageUpload.uploadImages("community/" + this.communityName);
      }
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

  checkTrim() {
    if ((this.text.trim() == "") || (this.text.trim() == null) || (this.title.trim() == null) || (this.title.trim() == "") || this.specificName == null) return true;

    else return false;

  }

  // determineSpecificRef(checkName: string) {
  //   console.log(checkName)
  //   this.specificName = checkName;

  //   this.checkList =[];
  // }

  determineSpecificRef(checkName: string, checkNumber: number) {
    console.log(checkName, "number :", checkNumber)

    if (this.checkList[checkNumber] == "false" && this.checkList[checkNumber+1] == "false") {
      this.checkList[0] = "true";
      this.checkList[1] = "true";
      this.checkList[2] = "true";
      this.checkList[3] = "true";
      this.checkList[4] = "true";
      this.checkList[5] = "true";
      this.checkList[6] = "true";
      this.checkList[checkNumber] = "false";
      this.specificName = checkName;
    }
    else if (this.checkList[checkNumber] == "false" && this.checkList[checkNumber+1] == "true") {
      this.checkList[0] = "false";
      this.checkList[1] = "false";
      this.checkList[2] = "false";
      this.checkList[3] = "false";
      this.checkList[4] = "false";
      this.checkList[5] = "false";
      this.checkList[6] = "false";
      this.specificName = null;
    }
    console.log("specificName : ", this.specificName)

  }

  checkInfoSpecific() {
    // STUDY, KOREAN, FOOD, BEAUTY
    if (this.communityName.substring(5, 7) == "ST") {
      this.afDB.list('/category/0/category_inner/0/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "KO") {
      this.afDB.list('/category/0/category_inner/1/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "FO") {
      this.afDB.list('/category/0/category_inner/2/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "BE") {
      this.afDB.list('/category/0/category_inner/3/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
  }

  checkLifeSpecific() {
    // JOB, CLUB, TRAVEL, PROBLEM, BOARD
    if (this.communityName.substring(5, 7) == "JO") {
      this.afDB.list('/category/1/category_inner/0/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "CL") {
      this.afDB.list('/category/1/category_inner/1/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "TR") {
      this.afDB.list('/category/1/category_inner/2/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "PR") {
      this.afDB.list('/category/1/category_inner/3/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "BO") {
      this.afDB.list('/category/1/category_inner/4/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
  }

  checkTravelSpecific() {
    // USED, OVERSEAS, HOUSE
    if (this.communityName.substring(5, 7) == "US") {
      this.afDB.list('/category/2/category_inner/0/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "OV") {
      this.afDB.list('/category/2/category_inner/1/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
    else if (this.communityName.substring(5, 7) == "HO") {
      this.afDB.list('/category/2/category_inner/2/specific_inner', ref => ref).valueChanges().subscribe(Items => {
        this.specificDB = Items;
      });
    }
  }



}