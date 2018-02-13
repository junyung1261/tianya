import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';
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

  bullets : Observable<any[]>
  bullets_tag : Observable<any[]>
  pageIndex: any = 0;
  communityBoard: any = 'CommunityBoardPage';
  categoryName: any;
  tabParams: any;
  searchBarFlag: number = 0;
  searchText = "";
  test: any[];
  specific_inner = [];
  specific = 'total';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,  
    public afDB: AngularFireDatabase, 
    public dataProvider: DataProvider) {
    
    
  }

  ngOnInit(){
    
    this.specific_inner = this.navParams.get('specific_inner');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityTemplatePage');
    this.categoryName = this.navParams.get('categoryName');
    this.bullets = this.afDB.list('/community/' + this.categoryName, ref => ref.orderByKey().limitToLast(5)).snapshotChanges().take(1).map((array)=>array.reverse());
    
  }

  closeCommunityTemplate() {
    this.navCtrl.pop();
  }

  pageTest() {
    // firebase 쿼리 페이지화
  }

  // getItems(searchbar) {

  // }

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

  segmentChanged(event){
    
    this.bullets_tag = this.afDB.list('/community/' + this.categoryName, ref => ref.orderByChild('type').equalTo(event).limitToLast(5)).snapshotChanges().take(1).map((array)=>array.reverse());
    
  }

  presentBoardCreate(categoryName) {
    let createModal = this.modalCtrl.create('CommunityCreatePage', { categoryName: categoryName, specific_inner: this.specific_inner }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      if(data){
        this.ionViewDidLoad();
        if(this.specific !='total')this.segmentChanged(this.specific); 
      }
    });
    createModal.present();
  }

  presentBoardModal(bullet) {

    console.log("bullet key : ", bullet.key)

    let createModal = this.modalCtrl.create('CommunityDetailPage',
      {
        categoryName: this.categoryName,
        bulletKey: bullet.key


        // give CommunityPromotionPage only key?  OR every data?
        // bulletTitle: bullet.title,
        // bulletDescription: bullet.description,
        // bulletDate = bullet.date,
        // bulletLike = bullet.like,
        // bulletComment = bullet.comment
      }, {
        enterAnimation: 'modal-slide-in',
        leaveAnimation: 'modal-slide-out'
      });
      
    createModal.onDidDismiss(data => {
      console.log('asdasd');
    });
    firebase.database().ref("community/" + this.categoryName + "/" + bullet.key).child('view').transaction(function(currentView){
      return currentView+1;
    });
    createModal.present();
    
  }

}
