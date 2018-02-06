import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../loading/loading';
import { AlertProvider } from '../alert/alert';
import { DataProvider } from './data';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class RequestProvider {
  // Request Provider
  // This is the provider class for most of the Request updates in the app.

  constructor(public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public dataProvider: DataProvider) {
    console.log("Initializing Firebase Provider");
  }

  // Send friend request to userId.
  sendFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var requestsSent;
    // Use take(1) so that subscription will only trigger once.
    this.dataProvider.getRequests(loggedInUserId).snapshotChanges().take(1).subscribe((requests) => {
      requestsSent = requests.payload.val().requestsSent;
      if (!requestsSent) {
        requestsSent = [userId];
      } else {
        if (requestsSent.indexOf(userId) == -1)
          requestsSent.push(userId);
      }
      // Add requestsSent information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        requestsSent: requestsSent
      }).then((success) => {
        var friendRequests;
        this.dataProvider.getRequests(userId).snapshotChanges().take(1).subscribe((requests) => {
          friendRequests = requests.payload.val().friendRequests;
          if (!friendRequests) {
            friendRequests = [loggedInUserId];
          } else {
            if (friendRequests.indexOf(userId) == -1)
              friendRequests.push(loggedInUserId);
          }
          // Add friendRequest information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            friendRequests: friendRequests
          }).then((success) => {
            this.loadingProvider.hide();
            this.alertProvider.showFriendRequestSent();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  // Cancel friend request sent to userId.
  cancelFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var requestsSent;
    this.dataProvider.getRequests(loggedInUserId).snapshotChanges().take(1).subscribe((requests) => {
      requestsSent = requests.payload.val().requestsSent;
      requestsSent.splice(requestsSent.indexOf(userId), 1);
      // Update requestSent information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        requestsSent: requestsSent
      }).then((success) => {
        var friendRequests;
        this.dataProvider.getRequests(userId).snapshotChanges().take(1).subscribe((requests) => {
          friendRequests = requests.payload.val().friendRequests;
          friendRequests.splice(friendRequests.indexOf(loggedInUserId), 1);
          // Update friendRequests information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            friendRequests: friendRequests
          }).then((success) => {
            this.loadingProvider.hide();
            this.alertProvider.showFriendRequestRemoved();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  // Delete friend request.
  deleteFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var friendRequests;
    this.dataProvider.getRequests(loggedInUserId).snapshotChanges().take(1).subscribe((requests) => {
      friendRequests = requests.payload.val().friendRequests;
      friendRequests.splice(friendRequests.indexOf(userId), 1);
      // Update friendRequests information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        friendRequests: friendRequests
      }).then((success) => {
        var requestsSent;
        this.dataProvider.getRequests(userId).snapshotChanges().take(1).subscribe((requests) => {
          requestsSent = requests.payload.val().requestsSent;
          requestsSent.splice(requestsSent.indexOf(loggedInUserId), 1);
          // Update requestsSent information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            requestsSent: requestsSent
          }).then((success) => {
            this.loadingProvider.hide();

          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
        //TODO ERROR
      });
    });
  }

  // Accept friend request.
  acceptFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    // Delete friend request.
    this.deleteFriendRequest(userId);

    this.loadingProvider.show();
    this.dataProvider.getUser(loggedInUserId).snapshotChanges().take(1).subscribe((account) => {
      var friends = account.payload.val().friends;
      if (!friends) {
        friends = [userId];
      } else {
        friends.push(userId);
      }
      // Add both users as friends.
      this.dataProvider.getUser(loggedInUserId).update({
        friends: friends
      }).then((success) => {
        this.dataProvider.getUser(userId).snapshotChanges().take(1).subscribe((account) => {
          var friends = account.payload.val().friends;
          if (!friends) {
            friends = [loggedInUserId];
          } else {
            friends.push(loggedInUserId);
          }
          this.dataProvider.getUser(userId).update({
            friends: friends
          }).then((success) => {
            this.loadingProvider.hide();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }
}
