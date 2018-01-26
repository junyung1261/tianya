import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-profile-modify',
  templateUrl: 'profile-modify.html',
})
export class ProfileModifyPage {
  information: any[];
 
  constructor(public navCtrl: NavController, private http: Http, public viewCtrl: ViewController) {
    let localData = http.get('assets/json/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })
  }

}
