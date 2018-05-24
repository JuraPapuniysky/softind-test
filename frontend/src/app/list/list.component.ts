import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../services/employees.service";
import {HttpClient} from "@angular/common/http";

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
        console.log(data.employees);
        this.employees = data.employees;
        this.averages = data.average;
      });
  }

}
