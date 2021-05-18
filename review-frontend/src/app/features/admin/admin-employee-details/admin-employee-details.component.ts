import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IReview, IUser } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-admin-employee-details',
  templateUrl: './admin-employee-details.component.html',
  styleUrls: ['./admin-employee-details.component.scss']
})
export class AdminEmployeeDetailsComponent implements OnInit {
  public empData$!: Observable<IUser>;
  public reviewForm!: FormGroup;
  public reviewDetails!: IReview[];
  private empId!: string;
  public get reviewList(): any {
    return this.reviewForm.get('list') as any;
  }
  constructor(private readonly adminService: AdminService, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      list: this.fb.array([
      ])
    });
    this.empId = this.route.snapshot.params.empId;
    this.empData$ = this.adminService.getEmployeeDetails(this.empId);
    this.getReviewList(this.empId)
  }

  public getReviewList(employeeId: string) {
    this.adminService.getEmployeeReviewList(employeeId).pipe(take(1))
      .subscribe(res => {
        this.reviewDetails = res;
        res.forEach(empData => {
          this.reviewList.push(this.createItem(empData))
        })
        this.reviewList.push(this.createItem({}));
      });
  }

  public createItem({ review = '', _id = '', assigned_to, isCompleted = false  }: any): FormGroup {
    return this.fb.group({
      review: [review, Validators.required],
      employee_id: [this.empId],
      _id: [_id],
      assigned_to: [assigned_to],
      isCompleted: [isCompleted]
    });
  }

  public addNew(index: number) {
    const review = this.reviewList.controls[index];
    if (review.valid) {
      const { _id, ...payload } = review.value;
      this.adminService.addReview(payload).pipe(take(1)).subscribe(res => {
        review.patchValue({
          review: res.review,
          _id: res._id,
          employee_id: res.employee_id,
          assigned_to: res.assigned_to,
          isCompleted: res.isCompleted
        })
        this.reviewList.push(this.createItem({}));
      });
    }

  }


  public updateItem(index: number) {
    const review: FormGroup = this.reviewList.controls[index] as FormGroup;
    if (review.valid) {
      const payload = { ...review.value };
      this.adminService.updateReview(payload).pipe(take(1)).subscribe(res => {
        review.patchValue({
          review: res.review,
          _id: res._id,
          employee_id: res.employee_id,
          assigned_to: res.assigned_to,
          isCompleted: res.isCompleted
        })
      });
    }
  }

}
