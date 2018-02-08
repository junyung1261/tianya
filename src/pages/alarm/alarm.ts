import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map'
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage { 
  information: any[];

 
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private afDB: AngularFireDatabase, private localNotifications: LocalNotifications) {

    this.afDB.list('/NOTICE', ref => ref.orderByChild('name')).valueChanges().subscribe(Items => {
      this.information = Items;

    });

    this.localNotifications.schedule({
      id: 1,
      title: 'Local Notification',
      text: 'This is test notification. It will pop up when you enter the NOITCE page.'
    });

  }
 
  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
}
