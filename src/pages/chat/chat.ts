import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})


export class ChatPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  viewChatRoomList(){
    this.navCtrl.push('ChatListPage', { });
  }

  viewMessageList(){
    this.navCtrl.push('MessagePage', { });
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

 
  

}