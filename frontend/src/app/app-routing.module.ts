import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


import {EmployeeComponent} from "./employee/employee.component";
import {ListComponent} from "./list/list.component";


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'employee/:id', component: EmployeeComponent},
  {path: 'list', component: ListComponent},
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
