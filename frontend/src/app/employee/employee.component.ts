import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public id: number;

  constructor(private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
