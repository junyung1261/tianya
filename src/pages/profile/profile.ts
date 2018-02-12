import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  category: any[];
  user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth, 
    private modalCtrl: ModalController

  ) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        
      }
      // page for auth. users
      else {
        if (true) {
        
            this.user = firebase.auth().currentUser;
            
          } else {

          }
        }
      });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.user = firebase.auth().currentUser;
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
