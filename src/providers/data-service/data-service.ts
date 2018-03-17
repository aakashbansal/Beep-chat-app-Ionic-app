import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { User, database } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth-service';

@Injectable()

export class DataService {

  profileObject$: AngularFireObject<Profile>;
  profileList$: AngularFireList<Profile>;

  constructor(private auth: AuthService,
    private database: AngularFireDatabase) {
  }

  getAuthenticatedUserProfile(): Observable<any> {
    return this.auth.getAuthenticatedUser()
      .map((user) => user.uid)
      .mergeMap(authId => this.database.object<Profile>(`/profiles/${authId}`)
        .snapshotChanges()
        .map(profile => ({
          payload: profile.payload.val(),
          key: profile.key
        })
        )
      )
      .take(1);
  }

  searchUser(firstName: string): Observable<any[]> {

    this.profileList$ = this.database.list<Profile>('/profiles', (res) => {
      return res.orderByChild('firstName').equalTo(firstName);
    });
    return this.profileList$.snapshotChanges().take(1);
  } 


  getProfile(user: User): Observable<Profile> {
    this.profileObject$ = this.database.object(`/profiles/${user.uid}`);
    return this.profileObject$.valueChanges().take(1);
  }

  async saveProfile(user: User, profile: Profile): Promise<boolean> {
    this.profileObject$ = this.database.object(`/profiles/${user.uid}`);
    try {
      await this.profileObject$.set(profile);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }



}
