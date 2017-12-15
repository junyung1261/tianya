import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommunityListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-list',
  templateUrl: 'community-list.html',
})
export class CommunityListPage {

  categoryId:any;
  categoryName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

   
    this.categoryName = (this.navParams.get('categoryName'));
    console.log(this.categoryName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityListPage');
  }

}
