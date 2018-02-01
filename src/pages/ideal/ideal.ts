import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

/**
 * Generated class for the ChatSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ideal',
  templateUrl: 'ideal.html',
})
export class IdealPage {

 
  public age: any = {upper:49, lower:15};
  public tall: any = {upper:195, lower:140};
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private appPreferences: AppPreferences) {
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdealPage');
  }
}
