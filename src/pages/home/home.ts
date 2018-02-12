import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MapOptions } from 'angular2-baidu-map';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
declare var KakaoTalk: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  options: MapOptions;
  markers: Array<{ point: any; options?: any }>
  test: any;
  categories: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public afDB: AngularFireDatabase,
    public geolocation: Geolocation) {
      this.afDB.list('/category', ref => ref).valueChanges().take(1).subscribe(categoryItems => {
        this.categories = categoryItems;
      });

    
    this.options = {
      centerAndZoom: {
        lat: 0,
        lng: 0,
        zoom: 16
      },
      enableKeyboard: true
    };

    this.markers = [
      {
        options: {
          icon: {
            imageUrl: '/assets/img/speakers/bear.jpg',
            size: {
              height: 60,
              width: 50
            }
          }
        },
        point: {
          lat: 31.244604,
          lng: 121.51606
        }
      }
    ]

  
    this.initializeMap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  

  logins() {
    if (typeof KakaoTalk !== 'undefined') {

      KakaoTalk.login(
        function (result) {
          console.log('Successful login!');
          this.test = result;
          console.log(result);
        },
        function (message) {
          console.log('Error logging in');
          console.log(message);
        }
      );
    }

  }
  initializeMap() {
 
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 
    this.geolocation.getCurrentPosition(locationOptions).then((position) => {
 
      console.log( position.coords.latitude + '' +position.coords.longitude,);
        this.options.centerAndZoom.lat = position.coords.latitude;
        this.options.centerAndZoom.lng = position.coords.longitude;

        this.markers[0].point.lat = position.coords.latitude;
        this.markers[0].point.lng = position.coords.longitude;
 
        /* Show our lcoation */
       // this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
 
        /* We can show our location only if map was previously initialized */
       // this.showMyLocation();
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
} 

  presentNoticeModal() {
    let createModal = this.modalCtrl.create('NoticePage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

}
