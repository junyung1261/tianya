import { Injectable } from '@angular/core';

//import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';

//import { Login } from '../login';
import { NavController, App } from 'ionic-angular';
import { LoadingProvider } from '../loading/loading';
import { AlertProvider } from '../alert/alert';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginProvider {
  // Login Provider
  // This is the provider class for most of the login functionalities on Firebase.
  // It's important that you set your Firebase and Social settings on login.ts
  // Other customizations can be done on login.ts such as setting your own the homePage,
  // trialPage, and verificationPages or disabling emailVerification.
  // It's important to hook this provider up with your navCtrl
  // In the constructor of the controller that uses this provider, call setNavController(navCtrl).
  
  private navCtrl: NavController;
  

  constructor(public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public afAuth: AngularFireAuth, public appCtrl: App) {
    console.log("Initializing Login Provider");
    
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
   
  }

  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  // Anonymous Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
  // redirects the user to its respective views. Make sure to enable Anonymous login on Firebase app authentication console.
 
  // Login on Firebase given the email and password.
  emailLogin(email, password) {
    this.loadingProvider.show();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
       
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Register user on Firebase given the email and password.
  register(email, password) {
    this.loadingProvider.show();
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
        this.navCtrl.setRoot('VerificationPage');
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Send Password Reset Email to the user.
  sendPasswordReset(email) {
    this.loadingProvider.show();
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then((success) => {
        this.loadingProvider.hide();
        this.alertProvider.showPasswordResetMessage(email);
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

}
