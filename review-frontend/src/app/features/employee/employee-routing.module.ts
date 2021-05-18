import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {
  ROUTES
} from '../../core/constants/index';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
const routes: Routes = [
  {
    path: ROUTES.EMPLOYEE.LIST,
    component: EmployeeListComponent
  },
  {
    path: ':empId',
    component: EmployeeDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
