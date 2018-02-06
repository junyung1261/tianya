import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
let apiUrl = 'http://yourdomain.com/PHP-Slim-Restful/api/';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  kakaoLogin() {
    var clientId = "200c07010a18026afaf7e922e1f28d11"
    var redirectUri = "https://localhost:8100/oauth"

    var url = "https://kauth.kakao.com/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&response_type=code";
    var response = this.http.get(url).map(res => res.json());
    return response;

}   

}
