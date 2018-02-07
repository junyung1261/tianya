import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import * as firebase from 'firebase';
import { AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the CommunityTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-template',
  templateUrl: 'community-template.html',
})
export class CommunityTemplatePage {

  pageIndex: any = 0;
  communityBoard: any = 'CommunityBoardPage';
  categoryName: any;
  tabParams: any;
  searchBarFlag: number = 0;
  searchText = "";
  test: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public superTabsCtrl: SuperTabsController, public afDB: AngularFireDatabase) {
    this.categoryName = (this.navParams.get('categoryName'));
    this.tabParams = { categoryName: (this.navParams.get('categoryName')) };
  }


  closeCommunityTemplate() {
    this.navCtrl.pop();
  }

  openSearchBar() {
    if (this.searchBarFlag == 0) {
      // 서치바 닫혀있는 상태면 서치바 열기
      this.searchBarFlag = 1;
    }
    else if (this.searchBarFlag == 1 && this.searchText.trim() != "") {
      // 서치바가 열려있고, input text가 차있으면 검색하기
      // 검색시작해서 리스트 보여주는 페이지로 넘어가고, 플래그 0으로 바꾸기 및 searchText 비우기

      // ----------------------------------------------------------------------------------------------------불가
      // firebase.database().ref('/community/' + this.categoryName).on('child_added', function(data) {
      //   // data.key will be like -KPmraap79lz41FpWqLI
      //   addNewTaskView(data.key, data.val().title);
      //   console.log(data.val().title);
      // });
      // this.test = firebase.database().ref('/community' + this.categoryName).orderByChild("title");
      // console.log(typeof this.test)
      // ----------------------------------------------------------------------------------------------------불가
      // firebase.database().ref('/community/' + this.categoryName).orderByChild("title").startAt(this.searchText).on('value', function (snapshot) {
      //   //snapshot would have list of NODES that satisfies the condition
      //   console.log(snapshot.val())

      //   //go through each item found and print out the emails
      //   snapshot.forEach(childSnapshot => {

      //     var key = childSnapshot.key;
      //     var childData = childSnapshot.val();

      //     //this will be the actual email value found
      //     console.log(childData.email);
      //   });

      // });
      // ------------------------------------------------------------------------------------------------------불가
      this.afDB.list('/community/' + this.categoryName, ref => ref.orderByChild("title").startAt(this.searchText)).valueChanges().subscribe(Items => {
        this.test = Items;
      });
      console.log("test : ",this.test)

      this.searchText = "";
      this.searchBarFlag = 0;

    }
    else if (this.searchBarFlag == 1 && this.searchText.trim() == "") {
      // 서치바가 열려있고, input text가 아무것도 없으면 서치바 닫기
      this.searchBarFlag = 0;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityTemplatePage');
  }

  ngAfterViewInit() {
    this.superTabsCtrl.enableTabsSwipe(false);
  }

  onTabSelect(tab: { index: number; id: string; }) {
    this.pageIndex = tab.index;
  }

}
