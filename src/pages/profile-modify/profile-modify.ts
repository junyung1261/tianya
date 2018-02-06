import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading/loading'
import { AngularFireDatabase } from 'angularfire2/database';
import { ImageProvider } from '../../providers/data/image';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile-modify',
  templateUrl: 'profile-modify.html',
})
export class ProfileModifyPage {
  
  firstRun;
  actionSheet;
  user;
  gender = 'none';
 
  constructor(public navCtrl: NavController , public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController,
              public imageProvider: ImageProvider, public loadingProvider: LoadingProvider, public afDB: AngularFireDatabase,
              public camera: Camera) {
    
  }

  ngOnInit(){
   

  }
  ionViewDidLoad() {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).once('value')
    .then((account) => {
      // No database data yet, create user data on database
      if (!account.val()) {
        this.firstRun = true;
        this.user = firebase.auth().currentUser;
        
        
      } else{
        this.firstRun = false;
        this.user = account.val();
        this.user.userId = account.key;
      }
    });
  
  //this.loadingProvider.show();
    
  }


  setPhoto() {
    // Ask if the user wants to take a photo or choose from photo gallery.
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Set Profile Photo',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  updateProfile(){
    
    var username, img, userId, email;
    userId = this.user.userId;
    // Get email from Firebase user.
    email = this.user.email;

    // Set default description.
    if(this.firstRun){
      this.afDB.object('/accounts/' + userId).update({
        username: this.user.username,
        gender: this.user.gender,
        email: email,
        description: this.user.description,
        birth: this.user.birth,
        dateCreated: new Date().toString()
      }).then(() => {
        this.viewCtrl.dismiss();
        //this.loadingProvider.hide();
      });
    }
    else{
      this.afDB.object('/accounts/' + userId).update({
        username: this.user.username,
        description: this.user.description
      }).then(() => {
        //this.loadingProvider.hide();
      });
    }
  }


}
