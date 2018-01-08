import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginProvider } from '../../providers/auth/login';
import { Validator } from '../../validator';

declare var KakaoTalk: any; 

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
              public formBuilder: FormBuilder) {

    this.loginProvider.setNavController(this.navCtrl);
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
    this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
  }

  loginKakao(){
    if (typeof KakaoTalk !== 'undefined') {

      KakaoTalk.login(
        function (result) {
          //this.loginProvider.kakaoLogin(result);
          console.log('Successful login!');
          this.text = result;
          console.log(result);
        },
        function (message) {
          console.log('Error logging in');
          console.log(message);
        }
      );
    }
    this.text = 'sex';

    
  }

  // Call loginProvider and register the user with email and password.
  register() {
    this.loginProvider.register(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
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
