import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public afDB: AngularFireDatabase) {
    
    
    this.categoryName =  this.navParams.get('categoryName');
     
    this.afDB.list('/category', ref => ref.orderByChild('type').equalTo(this.categoryName)).valueChanges().subscribe(categoryItems => {
      this.categories = categoryItems;
      
      
  });
      
  }

  ionViewDidLoad() {
    this.slides.autoplayDisableOnInteraction = false;
    console.log('ionViewDidLoad CommunityPromotionPage');
  }

  openList(categoryName) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(categoryName);
    this.navCtrl.push('CommunityListPage',{'categoryName': categoryName}); 
    
  }

  presentListModal(categoryName) {
    let createModal = this.modalCtrl.create('CommunityListPage', {'categoryName': categoryName}, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

  
}
