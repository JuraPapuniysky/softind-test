import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Injectable()

export class EmployeesService {

  private url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  public getEmployeesList(){
    return this.http.get(this.url+'employees/');
  }

  public getSearchList(creteria){
    return this.http.get(this.url + 'employees/search/' + creteria);
  }

}
