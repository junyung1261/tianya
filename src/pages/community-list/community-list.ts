import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {

   
    this.categoryName = (this.navParams.get('categoryName'));
    console.log(this.categoryName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityListPage');
  }

  openCreatePage(){
    this.navCtrl.push('CommunityCreatePage');
  }

  presentCreateModal() {
    let createModal = this.modalCtrl.create('CommunityCreatePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

}
