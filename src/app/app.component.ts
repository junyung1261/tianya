import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ModalController } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';

import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;
  loadedCommunityList:  any=[]; 
  typeList = ["CATEGORY_INFO",
    "CATEGORY_TRAVEL",
    "CATEGORY_LIFE",
    "CATEGORY_TRADE"]
  ;

  @ViewChild(Nav) nav: Nav;



  pages: any[];

 
  constructor(private translate: TranslateService, platform: Platform, settings: Settings,
              private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private modalCtrl: ModalController,
              private afDB: AngularFireDatabase) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
    

    this.afDB.list('/category', ref => ref.orderByChild('type')).valueChanges().subscribe(categoryItems => {
      this.pages = categoryItems;
      this.loadedCommunityList = categoryItems;
      
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


  presentListModal(categoryName) {
    let createModal = this.modalCtrl.create('CommunityListPage', {'categoryName': categoryName}, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }
  openPage(categoryName) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(categoryName);
    this.nav.setRoot('CommunityListPage',{'categoryName': categoryName}); 
    
  }

  

  initializeItems(){
    this.pages = this.loadedCommunityList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.pages = this.pages.filter((v) => {
      if(this.translate.instant(v.name) && q) {
        if (this.translate.instant(v.name).toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    

  }
  
}
