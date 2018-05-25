import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './/app-routing.module';
import { ListComponent } from './list/list.component';
import {EmployeesService} from "./services/employees.service";
import {ProjectsService} from "./services/projects.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EmployeesService,
    ProjectsService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
