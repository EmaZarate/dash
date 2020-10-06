import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './appconfig.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class RolService {


  constructor(private _httpClient: HttpClient, private _config: AppConfig) { }

  private rolUrl = this._config.BASE_URL + "/api/rol/";

  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(this.rolUrl + "GetAll");
  }

  deleteRol(id) {
    return this._httpClient.delete(this.rolUrl + "Delete/" + id, httpOptions);
  }

  getOne(id: Number) {
    return this._httpClient.get<any>(this.rolUrl + "GetOne/" + id);
  }

  add(rol: any) {
    return this._httpClient.post(this.rolUrl + "Add", rol, httpOptions);
  }

  update(rol: any) {
    return this._httpClient.put(this.rolUrl + "Update", rol, httpOptions);
  }

}
