import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login-response/login-response.interface';
import { AuthService } from '../../providers/auth-service/auth-service';
import { EMAIL_VALIDATE, PASSWORD_VALIDATE } from '../../pattern-regex/pattern';

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {} as Account;
  emailValidate: string = EMAIL_VALIDATE;
  passwordValidate: string = PASSWORD_VALIDATE;
  
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private navCtrl: NavController,
    private auth: AuthService) {

    this.loginStatus = new EventEmitter<LoginResponse>();
  } 

  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

  async login() {
    const loginResponse: LoginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    console.log(loginResponse);
    this.loginStatus.emit(loginResponse);
  }
}
