import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the MatchingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
})


export class MatchingPage {

  color1: string = 'matching-star-u';
  color2: string = 'matching-star-u';
  color3: string = 'matching-star-u';
  color4: string = 'matching-star-u';
  color5: string = 'matching-star-u';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchingPage');
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
  sendServerOneStar(){
    this.color1 = 'matching-star';
    this.color2 = 'matching-star-u';
    this.color3 = 'matching-star-u';
    this.color4 = 'matching-star-u';
    this.color5 = 'matching-star-u';
  }
  sendServerTwoStar(){
    this.color1 = 'matching-star';
    this.color2 = 'matching-star';
    this.color3 = 'matching-star-u';
    this.color4 = 'matching-star-u';
    this.color5 = 'matching-star-u';
  }
  sendServerThreeStar(){
    this.color1 = 'matching-star';
    this.color2 = 'matching-star';
    this.color3 = 'matching-star';
    this.color4 = 'matching-star-u';
    this.color5 = 'matching-star-u';
  }
  sendServerFourStar(){
    this.color1 = 'matching-star';
    this.color2 = 'matching-star';
    this.color3 = 'matching-star';
    this.color4 = 'matching-star';
    this.color5 = 'matching-star-u';
  }
  sendServerFiveStar(){
    this.color1 = 'matching-star';
    this.color2 = 'matching-star';
    this.color3 = 'matching-star';
    this.color4 = 'matching-star';
    this.color5 = 'matching-star';
  }

}