import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

/**
 * Generated class for the ChatSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-setting',
  templateUrl: 'chat-setting.html',
})
export class ChatSettingPage {

  brightness: number = 20;
  saturation: number = 0;
  warmth: number = 1300;
  public structure: any = {upper:100, lower:0};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private appPreferences: AppPreferences) {
    
    this.appPreferences.fetch('brightness', 'brightnessKey').then((res) => { console.log("brightness fetch type :", typeof res, "value :", res); this.brightness = res;});
    this.appPreferences.fetch('saturation', 'saturationKey').then((res) => { console.log("saturation fetch type :", typeof res, "value :", res); this.saturation = res;});
    this.appPreferences.fetch('warmth', 'warmthKey').then((res) => { console.log("warmth fetch type :", typeof res, "value :", res); this.warmth = res;});
   
    // this.appPreferences.fetch('structureLower', 'lowerStructureKey').then((res) => { console.log("lowerStructure fetch type :", typeof res, "value :", res); this.structure.lower = res;});
    // this.appPreferences.fetch('structureUpper', 'upperStructureKey').then((res) => { console.log("upperStructure fetch type :", typeof res, "value :", res); this.structure.upper = res;});
    this.appPreferences.fetch('structureLower', 'lowerStructureKey').then((res) => { console.log("lowerStructure fetch type :", typeof res, "value :", res); this.structure = {lower :res, upper:this.structure.upper};});
    this.appPreferences.fetch('structureUpper', 'upperStructureKey').then((res) => { console.log("upperStructure fetch type :", typeof res, "value :", res); this.structure = {lower : this.structure.lower, upper : res};});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatSettingPage');
  }
  onBrightnessChange(val : any) {
    console.log("brightness store type :", typeof val, "value :", val);
    this.appPreferences.store('brightness', 'brightnessKey', val);
  }
  onSaturationChange(val : any) {
    console.log("saturation store type :", typeof val, "value :", val);
    this.appPreferences.store('saturation', 'saturationKey', val);
  }
  onWarmthChange(val : any) {
    console.log("warmth store type :", typeof val, "value :", val);
    this.appPreferences.store('warmth', 'warmthKey', val);
  }
  onStructureChange(lowerVal : any, upperVal : any) {
    console.log("lowerstructure store type :", typeof lowerVal, "value :", lowerVal);
    console.log("upperstructure store type :", typeof upperVal, "value :", upperVal);
    this.appPreferences.store('structureLower', 'lowerStructureKey', lowerVal);
    this.appPreferences.store('structureUpper', 'upperStructureKey', upperVal);
  }
}
