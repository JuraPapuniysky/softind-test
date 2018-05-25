import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../models/Employee";



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

  public getEmployee(id){
    return this.http.get(this.url + 'employees/'+ id);
  }

  public updateEmployee(employee: Employee){
    return this.http.put(this.url + 'employees/', employee);
  }

  public updateEmployeeCharacteristic(score, characteristicId, employeeId){
    let data = {
      'employee_id': employeeId,
      'characteristic_id': characteristicId,
      'score': score
    };
    this.http.put(this.url + 'characteristics/change', data);
  }

}
