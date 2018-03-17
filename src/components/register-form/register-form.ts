import { Component, Output, EventEmitter } from '@angular/core';
import { Account } from '../../models/account/account.interface';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginResponse } from '../../models/login-response/login-response.interface';
import { EMAIL_VALIDATE ,PASSWORD_VALIDATE} from '../../pattern-regex/pattern';


@Component({ 
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  account = {} as Account;
  emailValidate: string = EMAIL_VALIDATE;
  passwordValidate: string = PASSWORD_VALIDATE;


  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthService) { 

    this.registerStatus = new EventEmitter<LoginResponse>();
  }


  async register() {
    const loginResponse: LoginResponse = await this.auth.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(loginResponse);
    console.log(loginResponse);
  }

}
