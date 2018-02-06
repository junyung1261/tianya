import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginProvider } from '../../providers/auth/login';
import { Validator } from '../../validator';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private emailPasswordNicknameForm: FormGroup;
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;
  private mode: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, 
    public formBuilder: FormBuilder) {
      this.loginProvider.setNavController(this.navCtrl);
      this.mode = this.navParams.get('mode');
      
      this.emailPasswordNicknameForm = formBuilder.group({
        email: Validator.emailValidator,
        password: Validator.passwordValidator,
        nickname: Validator.nicknameValidator
      });
      this.emailPasswordForm = formBuilder.group({
        email: Validator.emailValidator,
        password: Validator.passwordValidator
      });
      this.emailForm = formBuilder.group({
        email: Validator.emailValidator
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login() {
    this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
    
  }

  register() {
    this.loginProvider.register(this.emailPasswordNicknameForm.value["email"], this.emailPasswordNicknameForm.value["password"]);
  }

}
