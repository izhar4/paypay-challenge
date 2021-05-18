import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEmployeeDetailsComponent } from './admin-employee-details/admin-employee-details.component';


@NgModule({
  declarations: [AdminEmployeeListComponent, AdminEmployeeDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
