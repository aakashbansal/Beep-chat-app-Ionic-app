import { Injectable } from '@angular/core';
import { Account } from '../../models/account/account.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginResponse } from '../../models/login-response/login-response.interface';
import { User } from 'firebase/app';
import { Observable } from 'rxjs/observable';
import { DataService } from '../data-service/data-service';
import { OnlineUserService } from '../online-user-service/online-user-service';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private online: OnlineUserService) {

  } 

  logOut() { 
    this.online.removeOnlineUser().then(() => {
      this.afAuth.auth.signOut();
    })
  }

  getAuthenticatedUser(): Observable<User> {
    return this.afAuth.authState;
  }

  async createUserWithEmailAndPassword(account: Account): Promise<LoginResponse> {

    try {
      return <LoginResponse>{
        result: await this.afAuth.auth
          .createUserWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      };
    }

  }
  async signInWithEmailAndPassword(account: Account): Promise<LoginResponse> {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth
          .signInWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      };
    }
  }

}
