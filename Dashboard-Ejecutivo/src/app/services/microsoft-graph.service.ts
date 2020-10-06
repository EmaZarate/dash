import { Injectable } from '@angular/core';
import { AppConfig } from './appconfig.service';
import { AuthService } from './auth.service';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class MicrosoftGraphService {
  private redirectUri = this._config.BASE_URL + "/assets/microsoft-graph-auth.html";

  private authWindow: Window;
  //private appId = environment.APP_ID;

  private appId = this._config.APP_ID;

constructor(private _config: AppConfig, private authService: AuthService) {
    
    this.initializeEventToken(this.authService)
  }
 

  initializeEventToken(authService) {
    debugger
    $(window).on("message", function (this) {
      
      let message = this.event as MessageEvent
      authService.handleMessage(message);
    })
 
  }

  login() {
    debugger
    var url = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' + this.appId + '&response_type=code&redirect_uri=' + this.redirectUri + '&response_mode=query&scope=offline_access%20user.read&state=12345';
    var w = 600;
    var h = 400;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    this.authWindow = window.open(url, null, 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
  }

  closeWindow() {
    if (this.authWindow)
      this.authWindow.close();
  }

}

