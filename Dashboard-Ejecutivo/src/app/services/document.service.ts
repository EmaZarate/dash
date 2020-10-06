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
export class DocumentService {

  constructor(private _httpClient: HttpClient, private _config: AppConfig) { }

  private providerUrl = this._config.BASE_URL + "/api/document/";

  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(this.providerUrl + "GetAll");
  }

  deleteProvider(id) {
    return this._httpClient.delete(this.providerUrl + "Delete/" + id, httpOptions);
  }

  getOne(id: Number) {
    return this._httpClient.get<any>(this.providerUrl + "GetOne/" + id);
  }

  add(provider: any) {
    return this._httpClient.post(this.providerUrl + "Add", provider, httpOptions);
  }

  update(provider: any) {
    return this._httpClient.put(this.providerUrl + "Update", provider, httpOptions);
  }

}
