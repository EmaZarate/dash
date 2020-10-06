import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from "../models/Project";
import { AppConfig } from './appconfig.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class ProjectService {  

  constructor(private _httpClient: HttpClient, private _config:AppConfig) { }

  private projectUrl = this._config.BASE_URL + "/api/project/";
  
  getAll(enviroment:number): Observable<Project[]> {
      return this._httpClient.get<Project[]>(this.projectUrl + "GetAll/" + enviroment);
  }

  getProjectById(id): Observable<Project> {
    return this._httpClient.get<Project>(this.projectUrl + "GetProjectById/" + id);
  }

  publishProject(listGuidProject): Observable<string> {    
    return this._httpClient.post<string>(this.projectUrl + "PublishProject", listGuidProject, httpOptions);
  }

  getAllProjectName(enviroment: number): Observable<any> {
    return this._httpClient.get<any>(this.projectUrl + "GetAllProjectName/" + enviroment);
  }

  updateProject(project){
    return this._httpClient.put(this.projectUrl+"update", project, httpOptions);
  }

  addProject(){
    return this._httpClient.get(this.projectUrl+"add");
  }


  public deleteProject(id) {
    return this._httpClient.delete(this.projectUrl + "delete/" + id, httpOptions);
  }

}
