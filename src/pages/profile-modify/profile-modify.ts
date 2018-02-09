import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading/loading'
import { AngularFireDatabase } from 'angularfire2/database';
import { ImageProvider } from '../../providers/data/image';
import { Camera } from '@ionic-native/camera';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-profile-modify',
  templateUrl: 'profile-modify.html',
})
export class ProfileModifyPage {
  
  firstRun;
  actionSheet;
  user;
  account;
  
 
  constructor(public navCtrl: NavController , public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController,
              public imageProvider: ImageProvider, public loadingProvider: LoadingProvider, public dataProvider: DataProvider,
              public afDB: AngularFireDatabase,
              public camera: Camera) {
    
  }

 
  ionViewDidLoad() {


    this.loadingProvider.show();
    this.dataProvider.getCurrentUser().valueChanges().subscribe((user) => {
      this.loadingProvider.hide();
      this.user = user;
      this.user.userId = firebase.auth().currentUser.uid;
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
    
    var username, img, userId;
    userId = this.user.userId;
    // Get email from Firebase user.
    

    // Set default description.
   
      let profile = {
        displayName: this.user.username,
        photoURL: this.user.profileImg
      };
      
      firebase.auth().currentUser.updateProfile(profile).then((success) => {
        this.afDB.object('/accounts/' + userId).update({
          username: this.user.username,
          gender: this.user.gender,
          description: this.user.description,
          birth: this.user.birth
        }).then(() => {
          this.viewCtrl.dismiss();
          //this.loadingProvider.hide();
        });
      }).catch((error) => {
        // Show error
        this.loadingProvider.hide();
        let code = error["code"];
        // this.alertProvider.showErrorMessage(code);
        // if (code == 'auth/requires-recent-login') {
        //   this.logoutProvider.logout();
        // }
      });
      
   
  }


}
