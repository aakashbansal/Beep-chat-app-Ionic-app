import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OnlineUserService {

  ref$;

  constructor(private database: AngularFireDatabase) {

  }
 
  setUserOnline(profile) {
    this.ref$ = database().ref(`/online-users/${profile.key}`);

    try {
      this.ref$.update({ ...profile.payload }); 
      this.ref$.onDisconnect().remove();

    } catch (e) {
      console.log("Set Online Error :" + e);
    }

  } 

  removeOnlineUser(): Promise<void> {
    return this.ref$.remove();
  }

  getOnlineUsersList(): Observable<any[]> {
    return this.database.list<Profile>('online-users/').snapshotChanges();
  }

}
