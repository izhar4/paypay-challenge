import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ROUTES
} from './core/constants/index';


const routes: Routes = [
  {
      path: ROUTES.DASHBOARD.HOME,
      loadChildren: (): any =>
        import('./features/home/home.module').then(
          (m: any): any => m.HomeModule
        )
  },
  {
    path: ROUTES.EMPLOYEE.HOME,
    loadChildren: (): any =>
      import('./features/employee/employee.module').then(
        (m: any): any => m.EmployeeModule
      )
  },
  {
    path: ROUTES.ADMIN.HOME,
    loadChildren: (): any =>
      import('./features/admin/admin.module').then(
        (m: any): any => m.AdminModule
      )
  },
  
  {
    path: '**',
    redirectTo: `/${ROUTES.DASHBOARD.HOME}`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
