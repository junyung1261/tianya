import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {


  pageIndex: any = 0;
  page1: any = 'MessageReceivedPage';
  page2: any = 'MessageSendPage';
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  closeMessageList(){
    this.navCtrl.pop();
  }

}
