import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { Network } from '@ionic-native/network';
import { AppPreferences } from '@ionic-native/app-preferences';
import { HeaderColor } from '@ionic-native/header-color';

//***********  Angularfire2 v4 **************/

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { FCM } from '@ionic-native/fcm';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';


import { LoadingProvider } from '../providers/loading/loading';
import { LoginProvider } from '../providers/auth/login';
import { LogoutProvider } from '../providers/auth/logout';
import { AlertProvider } from '../providers/alert/alert';
import { DataProvider } from '../providers/data/data';
import { ImageProvider } from '../providers/data/image';
import { RequestProvider } from '../providers/data/request';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {

  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

//********** firebase configuration  ************ */
export const config = { 
  apiKey: "AIzaSyCj9s5Z1ZKrff_4BxF1ZSryzjY8KzTmbtI",
  authDomain: "tianya-6d56d.firebaseapp.com",
  databaseURL: "https://tianya-6d56d.firebaseio.com",
  projectId: "tianya-6d56d",
  storageBucket: "tianya-6d56d.appspot.com",
  messagingSenderId: "286006030163"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
        
      scrollAssist: true, 
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicImageViewerModule,
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AppPreferences,
    LocalNotifications,
    FCM,
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    Network,
    Geolocation,
    Device,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireDatabase,
   
    InAppBrowser,
    LoadingProvider,
    LoginProvider,
    LogoutProvider,
    AlertProvider,
    DataProvider,
    ImageProvider,
    RequestProvider,
    HeaderColor
  ]
})
export class AppModule { }
