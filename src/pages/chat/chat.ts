import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})


export class ChatPage {

  refresh;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public geolocation: Geolocation,
              public afDB: AngularFireDatabase) {
    this.initializeMap();
  }

  viewChatRoomList(){
    this.initializeMap();
    this.navCtrl.push('ChatListPage', { });
  }

  viewMessageList(){
    this.navCtrl.push('MessagePage', { });
  }
  ionViewDidEnter(){
    
  }
  
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ChatPage');

  }

  ionViewDidLeave(){
    console.log('tt')
    clearInterval(this.refresh);
  }


  initializeMap() {
 
    let locationOptions = {timeout: 10000, maximumage:60000, enableHighAccuracy: true};
 
    this.geolocation.watchPosition(locationOptions).subscribe((position) => {
      console.log(position);
      if(position.coords !== undefined){
        
        this.afDB.object('/accounts/' + firebase.auth().currentUser.uid + '/location').update({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

      }
      
      
      
      
 
        /* Show our lcoation */
       // this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
 
        /* We can show our location only if map was previously initialized */
       // this.showMyLocation();
 
    });
} 
 
  

}