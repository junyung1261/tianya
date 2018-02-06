/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const request = require('request-promise');
const cors = require('cors')({ origin: true });
const translate = require('google-translate-api');

// List of output languages.
const LANGUAGES = ['en', 'es', 'de', 'fr', 'sv', 'ga', 'it', 'jp', 'ko'];

// Translate an incoming message.

exports.translate = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    const text = JSON.parse(req.body).text;
    const key = JSON.parse(req.body).key;
    
    var db = admin.database();
    var ref = db.ref(`/feed/${key}`);
    
    
    translate(text, { to: 'ko' }).then(res => {
      
      admin.database().ref(`/feed/${key}/`).
      update({ translated: res.text });
      // console.log(res);
      // console.log(res.text);
      // //=> I speak English
      // console.log(res.from.language.iso);
      // //=> nl
    }).then(()=>{
      ref.once("value", function(snapshot){
        var data = snapshot.val().translated;
        //console.log(data);
        res.status(200).json({ data: data });
      })
      return 
    })
    .catch(err => {
      console.error(err);
    });
    
  });

   
  
});







//  functions.database.ref('/messages/{languageID}/{messageID}').onWrite(event => {
//   const snapshot = event.data;
//   if (snapshot.val().translated) {
//     return;
//   }
//   const promises = [];
//   for (let i = 0; i < LANGUAGES.length; i++) {
//     var language = LANGUAGES[i];
//     if (language !== event.params.languageID) {
//       promises.push(createTranslationPromise(event.params.languageID, language, snapshot));
//     }
//   }
//   return Promise.all(promises);
// });

// // // URL to the Google Translate API.
// function createTranslateUrl(source, target, payload) {
//   return `https://www.googleapis.com/language/translate/v2?key=${functions.config().firebase.apiKey}&source=${source}&target=${target}&q=${payload}`;
// }

// function createTranslationPromise(source, target, snapshot, key, result) {
//   const keys = key;
//   const message = snapshot;
//   console.log(keys + message);
//   return request(createTranslateUrl(source, target, message), {resolveWithFullResponse: true}).then(
//       response => {
//         if (response.statusCode === 200) {
//           const data = JSON.parse(response.body).data;
//           console.log(data.translations[0].translatedText);
//           result = data.translations[0].translatedText;
//           return admin.database().ref(`/feed/${keys}`)
//               .update({translated: data.translations[0].translatedText});
//         }
//         throw response.body;
//       });
// }
