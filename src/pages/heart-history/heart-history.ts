import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage() 
@Component({
  selector: 'page-heart-history',
  templateUrl: 'heart-history.html',
})
export class HeartHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeartHistoryPage');
  }

 
 

}
