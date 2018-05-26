import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ProjectsService {

  public url = 'http://localhost:8000/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  public getProjects(){
    return this.http.get(this.url + 'projects/')
  }

  public addProject(employeeId, projectId){
    let data = {
      'employee_id': employeeId,
      'project_id': projectId
    };
    return this.http.post(this.url + 'projects/add', data, this.httpOptions);
  }

  public deleteEmployeeProject(employeeId, projectId){
    return this.http.post(this.url + 'projects/deleteEmployeeProject/', {
      'employee_id': employeeId,
      'project_id': projectId
    });
  }
}
