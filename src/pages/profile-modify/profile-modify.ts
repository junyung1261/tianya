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
  account;
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
        this.user = firebase.auth().currentUser;
        this.account = account.val();
        
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
    userId = this.user.uid;
    // Get email from Firebase user.
    email = this.user.email;

    // Set default description.
    if(this.firstRun){

      let profile = {
        displayName: this.account.username,
        photoURL: this.account.profileImg
      };
      
      firebase.auth().currentUser.updateProfile(profile).then((success) => {
        this.afDB.object('/accounts/' + userId).update({
          username: this.account.username,
          gender: this.account.gender,
          email: email,
          description: this.account.description,
          birth: this.account.birth,
          dateCreated: new Date().toString()
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
    else{
      let profile = {
        displayName: this.account.username,
        photoURL: this.account.profileImg
      };

      firebase.auth().currentUser.updateProfile(profile).then((success) => {
        this.afDB.object('/accounts/' + userId).update({
          username: this.account.username,
          description: this.account.description
        }).then(() => {
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


}
