import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeService } from '../../../core/services/employee/employee.service';

import {
  IUser,
  IReview
} from '../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  public empData$!:Observable<IUser>;
  public reviewList!: IReview[];
  public reviewForm!: FormGroup;
  public get reviewFormArr(): any {
    return this.reviewForm.get('list') as any;
  }

  private empId: string = '';
  constructor(private empService: EmployeeService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.params.empId;
    this.reviewForm = this.fb.group({
      list: this.fb.array([
      ])
    });
    this.empData$ = this.empService.getEmployeeDetail(this.empId);
    this.empService.getReviewsForFeedback(this.empId).pipe(take(1))
    .subscribe(res=>{
      this.reviewList =  res;
      res.forEach(empData => {
        this.reviewFormArr.push(this.createItem(empData))
      })
    });

  }

  public createItem({ review = '', _id = '', employee_id, isCompleted = false  }: any): FormGroup {
    return this.fb.group({
      review: [review, Validators.required],
      employee_id: [employee_id],
      _id: [_id],
      assigned_to: [this.empId],
      isCompleted: [isCompleted],
    });
  }

  public submitFeedback(index: number){
    const review = this.reviewFormArr.controls[index];
    if (review.valid) {
      let { employee_id, ...payload} = review.value;
      payload = {...payload , employee_id: employee_id._id, isCompleted: true};
      this.empService.submitFeedback(payload).pipe(take(1)).subscribe(res => {
        this.reviewFormArr.removeAt(index);
        this.reviewList.splice(index, 1);
      });
    }
  }

}
