import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Settings } from '../../providers/providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  noticeRecept : boolean = false;
  eventRecept : boolean = false;
  messageReqt : boolean = false;
  messageAcpt : boolean = false;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public viewCtrl: ViewController, 
    private appPreferences: AppPreferences) {
  }

  

  ionViewDidLoad() {
    // Build an empty form for the template to render
    
  }

  ionViewWillEnter() {
    
  }

  onSettingChange(valueName : string) {
    // 공사중
    console.log("look :", valueName)
    console.log("noticeRecept :", this.noticeRecept)
    console.log("eventRecept :", this.eventRecept)
    console.log("messageReqt :", this.messageReqt)
    console.log("messageAcpt :", this.messageAcpt)
  }
}