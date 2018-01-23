import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';

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

  categories: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDB: AngularFireDatabase) {

    this.afDB.list('/category', ref => ref).valueChanges().take(1).subscribe(categoryItems => {
      this.categories = categoryItems;
     
    });
    
   
  }

  division(num: number, arr: any[]){
    let array = arr;
    let len = array.length;
    let cnt = Math.floor(len / num);
    let tmp = [];
    for (let i = 0; i < cnt; i++){
      tmp.push(array.splice(0,num));
    }

    return tmp;
  }

  
  modalBase(categoryName) {
    let createModal = this.modalCtrl.create('CommunityPromotionPage', {categoryName: categoryName,
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log('asdasd');
    });
    createModal.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');
  }

  openPromotion(categoryName){
    console.log(categoryName);
    this.navCtrl.push('CommunityPromotionPage',{categoryName: categoryName}); 
  }

  presentNoticeModal() {
    let createModal = this.modalCtrl.create('NoticePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

}


