import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin/admin.service';
import { take } from 'rxjs/operators'
@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.scss']
})
export class AdminEmployeeListComponent implements OnInit {
  public employee!: FormGroup;
  public get emplList(): any {
    return this.employee.get('list') as any;
  }
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.employee = this.fb.group({
      list: this.fb.array([
      ])
    });
  }

  ngOnInit(): void {
    this.fetchEmpList();
  }


  public addNew(index: number) {
    const emp = this.emplList.controls[index];

    if (emp.valid) {
      const { _id, ...payload } = emp.value;
      console.log('payload', payload)
      this.adminService.addEmployee(payload).pipe(take(1)).subscribe(res => {
        emp.patchValue({
          name: res.name,
          _id: res._id,
          role_id: res.role_id
        });
        this.emplList.push(this.createItem({}));
      });
    }

  }

  public remove(index: number) {
    const emp = this.emplList.controls[index];
    this.adminService.deleteEmployee(emp.value._id).pipe(take(1)).subscribe(res => {
      this.emplList.removeAt(index);
    });

  }

  public createItem({ name = '', _id = '' }): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      role_id: [2],
      _id: [_id]
    });
  }

  public updateItem(index: number) {
    const emp: FormGroup = this.emplList.controls[index] as FormGroup;
    if (emp.valid) {
      const payload = { ...emp.value };
      this.adminService.updateEmployee(payload).pipe(take(1)).subscribe(res => {
        emp.patchValue({
          name: res.name,
          _id: res._id,
          role_id: res.role_id
        })
      });
    }
  }

  public fetchEmpList() {
    this.adminService.getEmployeeList().pipe(take(1)).subscribe(res => {
      res.forEach(empData => {
        this.emplList.push(this.createItem(empData))
      })
      this.emplList.push(this.createItem({}));
    });
  }

  public assignOthersToReview(empId: string){
    this.adminService.assignOthersToReview({empId}).pipe(take(1)).subscribe(res=>{
      console.log(res);
    });
  }


}
