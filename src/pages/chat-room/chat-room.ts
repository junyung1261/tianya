import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  presentAlert() {
    /* 유저 신고 시작 */
    let alert = this.alertCtrl.create({
      title: '사용자 신고',
      subTitle: '대화 사용자를 신고합니다.',
      inputs: [
        {
          name: 'msg',
          placeholder: '신고 내용을 작성하세요. (최대 100자)',
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
          text: '신고',
          handler: data => {
            
          }
        }
      ]
    });
    alert.present();
    /* 유저 신고 끝 */
  }

  closeChatRoom(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }

}
