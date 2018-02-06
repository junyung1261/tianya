import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import 'rxjs/add/operator/take'

@Injectable()
export class DataProvider {
  // Data Provider
  // This is the provider class for most of the Firebase observables in the app.

  constructor(public angularfireDatabase: AngularFireDatabase) {
    console.log("Initializing Data Provider");
  }

  // Get all users
  getUsers() {
    return this.angularfireDatabase.list('/accounts', ref => ref.orderByChild('name'));
  }

  // Get user with username
  getUserWithUsername(username) {
    return this.angularfireDatabase.list('/accounts', ref => ref.orderByChild('username').equalTo(username));
  }

  // Get logged in user data
  getCurrentUser() {
    return this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    return this.angularfireDatabase.object('/accounts/' + userId);
  }

  // Get requests given the userId.
  getRequests(userId) {
    return this.angularfireDatabase.object('/requests/' + userId);
  }

  // Get friend requests given the userId.
  getFriendRequests(userId) {
    return this.angularfireDatabase.list('/requests', ref => ref.orderByChild('receiver').equalTo(userId));
  }

  // Get conversation given the conversationId.
  getConversation(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId);
  }

  // Get conversations of the current logged in user.
  getConversations() {
    return this.angularfireDatabase.list('/accounts/' + firebase.auth().currentUser.uid + '/conversations');
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId + '/messages');
  }

  // Get messages of the group given the Id.
  getGroupMessages(groupId) {
    return this.angularfireDatabase.object('/groups/' + groupId + '/messages');
  }

  // Get groups of the logged in user.
  getGroups() {
    return this.angularfireDatabase.list('/accounts/' + firebase.auth().currentUser.uid + '/groups');
  }

  // Get group info given the groupId.
  getGroup(groupId) {
    return this.angularfireDatabase.object('/groups/' + groupId);
  }

  getFeeds(batch, lastKey?) {
    return this.angularfireDatabase.list('/feed', ref => lastKey?  ref.orderByKey().limitToLast(batch).endAt(lastKey) : ref.orderByKey().limitToLast(batch));
  }
  getBullets(batch, location, lastKey?) {
    return this.angularfireDatabase.list(location, ref => lastKey?  ref.orderByKey().limitToLast(batch).endAt(lastKey) : ref.orderByKey().limitToLast(batch));
  }
}
