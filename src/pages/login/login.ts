import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginProvider } from '../../providers/auth/login';
import { Validator } from '../../validator';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private mode: string;
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;
  public text: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, 
              public formBuilder: FormBuilder, public modalCtrl: ModalController) {

    
    // Create our forms and their validators based on validators set on validator.ts.
    this.emailPasswordForm = formBuilder.group({
      email: Validator.emailValidator,
      password: Validator.passwordValidator
    });
    this.emailForm = formBuilder.group({
      email: Validator.emailValidator
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.mode = 'main';
  }

  login() {
    
    let createModal = this.modalCtrl.create('RegisterPage', { mode: 'login' }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: "login"
    });
    createModal.onDidDismiss(data => {
      console.log('dddd');
    });
    createModal.present();
    
  
  }

  

  // Call loginProvider and register the user with email and password.
  register() {
    let createModal = this.modalCtrl.create('RegisterPage', { mode: 'register' }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: "register"
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
    
  }

  // Call loginProvider and send a password reset email.
  forgotPassword() {
    this.loginProvider.sendPasswordReset(this.emailForm.value["email"]);
    this.clearForms();
  }

  // Clear the forms.
  clearForms() {
    this.emailPasswordForm.reset();
    this.emailForm.reset();
  }



}
