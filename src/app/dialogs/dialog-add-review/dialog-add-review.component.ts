import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rating } from 'src/app/Interfaces/Rating';
import AppointmentModel from 'src/app/Models/AppointmentModel';
import ReviewModel from 'src/app/Models/ReviewModel';
import { AuthService } from 'src/app/Services/auth.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-dialog-add-review',
  templateUrl: './dialog-add-review.component.html',
  styleUrls: ['./dialog-add-review.component.css']
})
export class DialogAddReviewComponent implements OnInit {

  private Review !: ReviewModel;
  reviewForm !: FormGroup;

  ratings: Rating =
    {
      value: 1,
      max: 10,
      color: "primary"
    };


  constructor(@Inject(MAT_DIALOG_DATA) public appointment: AppointmentModel, private authService: AuthService,
    private reviewService: ReviewService, private formbuilder: FormBuilder, private dialogRef: MatDialogRef<DialogAddReviewComponent>) {
  }

  ngOnInit(): void {

    this.reviewForm = this.formbuilder.group({
      grade: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      review: ['', Validators.required]
    });

    this.Review = new ReviewModel(0, 0, 0, 0, '0', false)
    this.Review.appointmentId = this.appointment.id;
    this.Review.userId = this.authService.GetId();
    this.Review.isOke = false;
  }

  addReview() {

    if (!this.reviewForm.value.grade)
      this.ratings.color = "warn"

    if (this.reviewForm.valid) {
      this.Review.grade = this.reviewForm.value.grade;
      this.Review.review = this.reviewForm.value.review;
      this.reviewService.addReview(this.Review).subscribe(data => {
        if (data) {
          this.reviewForm.reset();
          this.dialogRef.close();
        }
      });
    }
  }

  changeColor() {

    if (this.reviewForm.value.grade)
      this.ratings.color = "primary";
  }
}
