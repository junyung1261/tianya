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
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, 
    public formBuilder: FormBuilder) {

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

  register() {
    this.loginProvider.register(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
  }

}
