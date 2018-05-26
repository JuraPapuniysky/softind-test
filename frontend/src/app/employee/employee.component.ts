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
  public projectId: number;


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
    let dataResp: any;
    this.employeesService.getEmployee(id)
      .subscribe(data=>{
         dataResp = data;
        this.employee = dataResp.employees[0];
        this.employeeProjects = this.employee.projects;
        this.model = new Employee(this.employee.id, this.employee.full_name, this.employee.photo, this.employee.characteristics);
        console.log(this.employee);
      })
  }

  public getProjects(){
    let dataResp: any;
    this.projectService.getProjects()
      .subscribe(data => {
        dataResp  = data;
        this.projects = dataResp.projects;
      })
  }

  public addProject(){
    let dataResp: any;
    this.projectService.addProject(this.id, this.projectId)
      .subscribe(data => {
        dataResp = data;
        this.employeeProjects = dataResp.projects
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
    let dataResp: any;
    this.employeesService.updateEmployee(this.model)
      .subscribe(data => {
        dataResp = data;
        this.employee = dataResp.employees[0];
      });
  }

  public deleteEmployeeProject(projectId){
    let index = this.employeeProjects.findIndex(d => d.id === projectId);
    this.projectService.deleteEmployeeProject(this.id, projectId)
      .subscribe(data => {
        if (data === 204){
          this.employeeProjects.splice(index, 1);
        }
      })
  }

  public onChangeSkill(value, characteristicId){
    this.employeesService.updateEmployeeCharacteristic(value, characteristicId, this.employee.id)
      .subscribe(data => {
        this.employee.characteristics = data;
      });
  }

  public onChangeProject(projectId){
    this.projectId = projectId;
  }

}
