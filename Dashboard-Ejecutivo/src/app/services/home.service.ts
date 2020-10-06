import { Injectable } from '@angular/core';
import { AppConfig } from './appconfig.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  
  private homeUrl = this._config.BASE_URL + "/api/home/";
  //private homeUrl = "https://localhost:44354/api/home/";

  constructor(private _httpClient: HttpClient, private _config: AppConfig) { }

  getAllProjectsPWA(): Observable<any> {
    return this._httpClient.get<any>(this.homeUrl + "GetAllProjectsPWA");
  }

  getProjectByIdPWA(guidProject): Observable<any> {
    return this._httpClient.get<any>(this.homeUrl + "GetProjectByIdPWA/" + guidProject);
  }

  getRoles(){
    return this._httpClient.get(this.homeUrl+"getroles");
  }

  getProveedores(){
    return this._httpClient.get(this.homeUrl + "getproveedores");
  }

  getAreas(){
    return this._httpClient.get(this.homeUrl+"getareas");
  }


  getStates() {
    return this._httpClient.get(this.homeUrl + "GetStates");
  }
  


}
