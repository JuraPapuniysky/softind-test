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

  public showForm: boolean = false;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
   this.list();
  }

  public list() {
    this.employeesService.getEmployeesList()
      .subscribe(data => {
        console.log(data);
        this.employees = data.employees;
        this.averages = data.average;
      });
  }

  public createEmployee(fullName){
    this.showForm = false;
    this.employeesService.create(fullName)
      .subscribe(data => {
        this.employees.push(data.employee);
      });
  }

  public search(creteria){
    if (creteria != '') {
      this.employeesService.getSearchList(creteria)
        .subscribe(data => {
          this.employees = data.employees;
        });
    } else {
      this.list();
    }
  }

  public deleteEmployee(employeeId){
    let index = this.employees.findIndex(d => d.id === employeeId);
    this.employeesService.delete(employeeId)
      .subscribe(data => {
        this.employees.splice(index, 1);
      });
  }

  public getShowForm(){
    return this.showForm;
  }

  public setShowForm(value: boolean){
    this.showForm = value;
  }

}
