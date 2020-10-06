import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AppConfig } from './appconfig.service';
import { LoginService } from './login.service';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private static errorInLogin = new Subject();
  errorInLogin$ = AuthService.errorInLogin.asObservable();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _config: AppConfig
  ) { }

  authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  private rol;


  canActivate(next: ActivatedRouteSnapshot) {
    debugger
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    if (this.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    }
    let role = this.getUserLogedRol();
    let allowedRole = next.children[0].data['roles'] as Array<string>;
    if (!allowedRole) return true;
    if (!role) return false;
    let canPass = false;
    allowedRole.forEach((el) => {
      if (el == role) canPass = true;
    });

    if (canPass) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

  getUserLogedRol() {
    debugger
    let token = this.getDecodedAccessToken();
    if (token) this.rol = token.rol;

    return this.rol;
  }

  getUserLogged() {
    debugger
    let token = this.getDecodedAccessToken();
    return token ? token : null;
  }

  private getDecodedAccessToken() {
    debugger
    try {
      let token = localStorage.getItem('auth_token');
      return jwt_decode(token);
    }
    catch (Error) {
      return null
    }
  }

  isTokenExpired(): boolean {
    debugger
    let token = this.getDecodedAccessToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate();
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate() {
    debugger
    let token = this.getDecodedAccessToken();

    if (token.exp == undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
  }
  handleMessage(event: Event) {
    debugger
    event.preventDefault();
    const message = event as MessageEvent;

    // Only trust messages from the below origin.
    //
    if ((message.origin !== this._config.BASE_URL)) return;

    const result = JSON.parse(message.data);

    if (!result.status) {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
      this.router.navigate(['/error-login']);
    }
    else {
      this.failed = false;

      this.loginService.loginExternalAuthUser(result.accessToken, result.provider)
        .subscribe(
          result => {
            if (result) {
              AuthService.errorInLogin.next(null);
              this.router.navigate(['/home']);
            }
          },
          error => {
            AuthService.errorInLogin.next(error);
            this.failed = true;
            this.error = error;
            this.router.navigate(['/error-login']);
          });
    }
  }
}




