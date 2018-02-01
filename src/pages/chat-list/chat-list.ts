import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  presentAlert(req) {
    /* 쪽지 전송 시작 req=0 */
    if(req==0){
      let alert = this.alertCtrl.create({
        title: '쪽지 전송',
        subTitle: '상대방에게 쪽지를 전송합니다. 전송 시 90p가 차감됩니다. (최대 100자)',
        inputs: [
          {
            name: 'msg',
            placeholder: '전송할 내용을 작성하세요.',
            type: 'text',
          }
        ],
        buttons: [
          {
            text: '취소',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '전송',
            handler: data => {
              
            }
          }
        ]
      });
      alert.present();
    }
    /* 쪽지 전송 끝 req=0 */
    /* 대화 요청 시작 req=1 */
    if(req==1){
      let alert = this.alertCtrl.create({
        title: '대화 신청',
        subTitle: '상대방에게 대화를 신청합니다',
        buttons: [
          {
            text:'취소',
            role:'cancel',
            handler:() => {
              console.log('Cancel clicked');
            }
          },
          {
            text:'신청',
            handler:() => {
              this.navCtrl.push('ChatRoomPage',{});
            }
          }
        ]
      });
      alert.present();
    }
    /* 대화 요청 끝 req=1 */
  }

  closeChatList(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
  }

}
