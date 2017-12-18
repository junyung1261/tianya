import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the CommunityPromotionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-promotion',
  templateUrl: 'community-promotion.html',
})


export class CommunityPromotionPage {
  @ViewChild(Slides) slides: Slides;

  categoryName: any;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afDB: AngularFireDatabase) {
    
    
     this.categoryName =  this.navParams.get('categoryName');
     
    
      
  }

  ionViewDidLoad() {
    this.slides.autoplayDisableOnInteraction = false;
    console.log('ionViewDidLoad CommunityPromotionPage');
  }

  test(){
    console.log("tt");
  }
}
