import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../services/employees.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public employees: any;
  public averages: any;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
   this.list();
  }

  public list(){
    this.employeesService.getEmployeesList()

      .subscribe(data => {
        console.log(data);
        this.employees = data.employees;
        this.averages = data.average;
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

}
