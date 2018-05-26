import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../services/employees.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public employees: any;
  public averages: any;

  private data: any;

  public showForm: boolean = false;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
   this.list();
  }

  public list() {
    let dataResp:any;
    this.employeesService.getEmployeesList()
      .subscribe(data => {
        dataResp = data;
        this.employees = dataResp.employees;
        this.averages = dataResp.averages;
      });
  }

  public createEmployee(fullName){
    let dataResp: any;
    this.showForm = false;
    this.employeesService.create(fullName)
      .subscribe(data => {
        dataResp = data;
        this.employees.push(dataResp.employees[0]);
      });
  }

  public search(creteria){
    let dataResp: any;
    if (creteria != '') {
      this.employeesService.getSearchList(creteria)
        .subscribe(data => {
          dataResp = data;
          this.employees = dataResp.employees;
        });
    } else {
      this.list();
    }
  }

  public deleteEmployee(employeeId){
    let index = this.employees.findIndex(d => d.id === employeeId);
    this.employeesService.delete(employeeId)
      .subscribe(data => {
        if (data == 204){
          this.employees.splice(index, 1);
        }
      });
  }

  public getShowForm(){
    return this.showForm;
  }

  public setShowForm(value: boolean){
    this.showForm = value;
  }

}
