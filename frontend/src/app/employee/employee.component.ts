import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeesService} from "../services/employees.service";
import {ProjectsService} from "../services/projects.service";
import {Employee} from "../models/Employee";

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


  public model;

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
        this.model = new Employee(this.employee.id, this.employee.full_name, this.employee.photo, this.employee.characteristics);
        console.log(this.employee);
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

  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.photo = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
      };
    }
  }

  public updateEmployee(){
    this.employeesService.updateEmployee(this.model)
      .subscribe(data => {
        this.employee = data.employees[0];
        console.log(data);
      });
  }

  public onChangeSkill(value, characteristicId){
    this.employeesService.updateEmployeeCharacteristic(value, characteristicId, this.employee.id)
      .subscribe(data => {
        this.employee.characteristics = data;
      });
  }

}
