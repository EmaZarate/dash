import { Component, OnInit } from '@angular/core';
import { FactoryLogin } from '../../factories/factory-login';
import { IUserServices } from "../../interfaces/IUserServices";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private serviceLogin: IUserServices;
  constructor(private loginFactory: FactoryLogin,
    private router: Router){ }
  ngOnInit() {
   
  }

  ngAfterViewInit() {
  
    let token = localStorage.getItem('auth_token');
    if (token) {
      this.router.navigate(['/home']);
    }
    else {
      this.serviceLogin = this.loginFactory.createLogin(2);
      this.serviceLogin.login();
    }
  }

  ingresar(){
    debugger
    this.serviceLogin = this.loginFactory.createLogin(2);
    this.serviceLogin.login();
  }

}
