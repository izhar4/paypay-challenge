import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Observable } from 'rxjs';
import {
  IReview,
  IUser,
} from '../../../core/models';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  empList$!: Observable<IUser[]>;
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empList$ = this.empService.getEmployeeList();
  }

}
