import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {

  category: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.category = [{
      "description" : "#실시간이슈 #할인 #맛집",
      "imgBg" : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/World-trade-center-view-1980.jpg/800px-World-trade-center-view-1980.jpg",
      "name" : "정보",
      "show" : true,
      "type" : "place"
    }, {
      "description" : "#유학이야기 #고민 #중고 #알바 #빈방",
      "imgBg" : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Naha_Okinawa_Japan_Shuri-Castle-02.jpg/800px-Naha_Okinawa_Japan_Shuri-Castle-02.jpg",
      "name" : "생활",
      "show" : true,
      "type" : "place"
    }, {
      "description" : "#친구 #애완동물 #취미",
      "imgBg" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/The_Bridge_%28August_2013%29.jpg/800px-The_Bridge_%28August_2013%29.jpg",
      "name" : "교류",
      "show" : true,
      "type" : "place"
    }, {
      "description" : "#여행후기 #미용 #성형",
      "imgBg" : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/PalaceOfWestminsterAtNight.jpg/800px-PalaceOfWestminsterAtNight.jpg",
      "name" : "여행",
      "show" : true,
      "type" : "place"
    }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');
  }

  openList(categoryId){
    this.navCtrl.push('List2Page',{categoryId:categoryId}); 
}
}


