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
  page1: any = 'ChatFriendsPage';
  page2: any = 'ChatListPage';
 

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

  

  
}
