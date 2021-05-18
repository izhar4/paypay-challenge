import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ROUTES
} from '../../core/constants/index';
import { AdminEmployeeDetailsComponent } from './admin-employee-details/admin-employee-details.component';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
const routes: Routes = [{
  path: ROUTES.ADMIN.EMPLOYEE,
  component: AdminEmployeeListComponent
},
  {
    path: `${ROUTES.ADMIN.EMPLOYEE}/:empId`,
    component: AdminEmployeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
