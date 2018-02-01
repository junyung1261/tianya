import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SuperTabsController} from 'ionic2-super-tabs';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {


  pageIndex: any = 0;
  page1: any = 'MessageReceivedPage';
  page2: any = 'MessageSendPage';
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public superTabsCtrl: SuperTabsController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }


  ngAfterViewInit() {
    this.superTabsCtrl.enableTabsSwipe(true);
  }

  closeMessageList(){
    this.navCtrl.pop();
  }

  onTabSelect(tab: { index: number; id: string; }) {
    this.pageIndex = tab.index;
  }
}
