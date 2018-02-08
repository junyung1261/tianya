import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ModalController, AlertController, App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Settings } from '../providers/providers';
import { HeaderColor } from '@ionic-native/header-color';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FCM } from '@ionic-native/fcm';
import * as firebase from 'firebase';
import { LogoutProvider } from '../providers/auth/logout'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  loadedCommunityList: any = [];

  @ViewChild(Nav) nav: Nav;


  pages: any[];
  category: any[];
  user;
  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private alertCtrl: AlertController,
    private config: Config, private statusBar: StatusBar, private headerColor: HeaderColor, private splashScreen: SplashScreen, private modalCtrl: ModalController,
    private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, private network: Network, private app: App, private fcm: FCM, private logoutProvider: LogoutProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
        if (platform.is('android')) {
          statusBar.overlaysWebView(false);
          statusBar.backgroundColorByHexString('#35babc');
          headerColor.tint('#35babc');
      }
      this.splashScreen.hide();
     
      // FCM push notification start--------------------

      // this.fcm.subscribeToTopic('all');
      // this.fcm.getToken().then(token => {
      //   // backend.registerToken(token);
      // });
      // this.fcm.onNotification().subscribe(data => {
      //   alert('message received')

      //   if (data.wasTapped) {
      //     console.info("Received in backgroundasdasd");
      //   } else {
      //     console.info("Received in foreground");
      //   };
      // });
      // this.fcm.onTokenRefresh().subscribe(token => {
      //   // backend.registerToken(token);
      // });

      // FCM push notification end---------------------
    });
    this.initTranslate();
    
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        // you can modify here the page for non. auth users
        // this.nav.setRoot('LoginPage');
        this.nav.setRoot('LoginPage');
        
      }
      // page for auth. users
      else {
        if (true) {
          if (user["emailVerified"]) {
            //Goto Home Page.

            this.nav.setRoot('TabsPage', { animate: false });
            this.user = firebase.auth().currentUser;
            
            //Since we're using a TabsPage an NgZone is required.
          } else {
            //Goto Verification Page.
            this.nav.setRoot('VerificationPage', { animate: false });
          }
        }
      }

    });

    
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });



  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }


    this.config.set('ios', 'backButtonText', '');

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

  presentListModal(categoryName) {
    let createModal = this.modalCtrl.create('CommunityPage', { 'categoryName': categoryName }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }
 

  locateCustomerServiceEmail(){ 
    //this email(wangting5@naver.com) is for test.
    //And test is done. So, Don't send any mail.
    window.location.href = "mailto:wangting5@naver.com";
  }

  

  logout(){
    let alert = this.alertCtrl.create({
      title: '로그아웃',
      message: '정말로 로그아웃 하시겠습니까?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.logoutProvider.logout();
           
          }
        }
      ]
    });
    alert.present();
    
  }

}
