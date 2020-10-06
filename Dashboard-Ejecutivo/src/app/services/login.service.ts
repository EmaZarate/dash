import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogging = new Subject<boolean>();
  isLogging$ = this.isLogging.asObservable();


  private _authNavStatusSource = new BehaviorSubject<boolean>(false);

  private user: User;
  private userLoged = new BehaviorSubject<User>(this.user);
  userLoged$ = this.userLoged.asObservable();
  private authWindow: Window;
  private loggedIn = false;

  constructor(private _httpService: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);

    if (!!localStorage.getItem('user_loged')) {
      this.userLoged.next(JSON.parse(localStorage.getItem('user_loged')));
    }
  }

  loginExternalAuthUser(accessToken: string, endpoint: string) {
    this.isLogging.next(true);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });
    //let url = 'api/externalauth/' + endpoint;
    let url = 'https://localhost:44354/api/externalauth/' + endpoint;
    return this._httpService
      .post(
        url, body, httpOptions)
      .map((res: any) => {

        localStorage.setItem('auth_token', res.auth_token);
        this.user = new User();
        this.user.name = res.name;
        this.user.email = res.userName;
        this.user.tokenAD = res.tokenAD;
        this.userLoged.next(this.user);

        localStorage.setItem('user_loged', JSON.stringify(this.user));

        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        this.isLogging.next(false);
        return res;
      })
      //.catch(this.handleError)
      .finally(() => this.isLogging.next(false));
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  logout() {

    var url = 'https://login.microsoftonline.com/common/oauth2/logout';
    var w = 600;
    var h = 400;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    //this.authWindow = window.open(url, null);
    this.authWindow = window.open(url, null, 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);


    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_loged');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);

  }

}
