import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MyinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
})
export class MyinfoPage {

  profile:  Observable<any>;
  imgGallery: Observable<any[]>;
  friends:  Observable<any[]>;
  imgGalleryArray : any=[]; 

  segmentView: string = "one";
  following: boolean = false;
  
  showToolbar:boolean = false;
  transition:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';

  section: string = 'two';
  somethings: any = new Array(20);



  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef,
              public afDB: AngularFireDatabase, public toastCtrl: ToastController, public modalCtrl: ModalController
             ) {

                this.profile = afDB.object('/profile/1').valueChanges();
                this.friends = afDB.list('/profile/1/friends').valueChanges();
                this.imgGallery = afDB.list('/gallery').valueChanges();
                this.imgGallery.subscribe(imgGallery => {
                    this.imgGalleryArray = imgGallery;
                    
                })
                
                
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyinfoPage');
  }

  follow() {
    this.following = !this.following;
    this.presentToast('bottom','Follow user clicked');
  }

  presentToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 1000
    });
    toast.present();
  }

  presentSettingModal() {
    let createModal = this.modalCtrl.create('SettingPage', { userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      //console.log(data);
    });
    createModal.present();
  }

  


}
