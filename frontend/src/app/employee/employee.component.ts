import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeesService} from "../services/employees.service";
import {ProjectsService} from "../services/projects.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public id: number;
  public employee: any;
  public employeeProjects: any;
  public projects: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private employeesService: EmployeesService,
    private projectService: ProjectsService
  ) {
    this.id = activateRoute.snapshot.params['id'];

  }

  ngOnInit() {
    this.getEmployee(this.id)
    this.getProjects();

  }

  public getEmployee(id){
    this.employeesService.getEmployee(id)
      .subscribe(data=>{
        this.employee = data.employees[0];
        this.employeeProjects = this.employee.projects;
        console.log(data);
      })
  }

  public getProjects(){
    this.projectService.getProjects()
      .subscribe(data => {
        this.projects = data.projects;
      })
  }

  public addProject(projectId){
    this.projectService.addProject(this.id, projectId)
      .subscribe(data => {
        this.employeeProjects = data.projects
      })
  }

}
