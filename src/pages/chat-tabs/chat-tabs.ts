import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SuperTabsController} from 'ionic2-super-tabs';


/**
 * Generated class for the ChatTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-tabs',
  templateUrl: 'chat-tabs.html',
})
export class ChatTabsPage {


  pageIndex: any = 0;
  page1: any = 'ChatMatchingPage';
  page2: any = 'ChatFriendsPage';
  page3: any = 'ChatListPage';
  page4: any = 'HomePage';
  page5: any = 'HomePage';

  constructor(public navCtrl: NavController, public navParams: NavParams, public superTabsCtrl: SuperTabsController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatTabsPage');
  }


  ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    //this.superTabsCtrl.enableTabSwipe('page2', false);
    this.superTabsCtrl.enableTabsSwipe(true);

    
  }

  
  onTabSelect(tab: { index: number; id: string; }) {
    this.pageIndex = tab.index;
    
  }

  

  presentModal(modalName) {
    let createModal = this.modalCtrl.create(modalName, { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      //console.log(data);
    });
    createModal.present();
  }
}
