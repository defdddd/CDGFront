import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import AppointmentModel from 'src/app/Models/AppointmentModel';
import PersonModel from 'src/app/Models/PersonModel';
import ReviewModel from 'src/app/Models/ReviewModel';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { PersonService } from 'src/app/Services/person.service';
import { ReviewService } from 'src/app/Services/review.service';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-dialog-review',
  templateUrl: './dialog-review.component.html',
  styleUrls: ['./dialog-review.component.css']
})
export class DialogReviewComponent implements OnInit {

  reviewForm !: FormGroup;
  actionBtn : string = "Add";
  private id : number = 0;
  users !: PersonModel[];
  appointments !: AppointmentModel[];
  Auth !: boolean;

  constructor(private personService: PersonService, private appointmentService: AppointmentService, private reviewService: ReviewService, private formbuilder: FormBuilder,
     private route: Router, private dialogRef: MatDialogRef<DialogReviewComponent>,
     @Inject(MAT_DIALOG_DATA) private editData: ReviewModel, private auth : AuthService
     ) { 
       this.personService.GetUsers().subscribe(data => this.users = data);
       this.appointmentService.GetAppointments().subscribe(data => this.appointments = data);
       this.Auth = auth.IsAdmin();
     }

  ngOnInit(): void {
    this.reviewForm = this.formbuilder.group({
      userId : [{value: "", disabled: this.actionBtn == "Update"}, Validators.required],
      appointmentId : [{value: "", disabled: this.actionBtn == "Update"}, Validators.required],
      grade : ['', Validators.compose([Validators.required, Validators.min(1),Validators.max(10)])],
      review : ['', Validators.required],
      isOke: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.id = this.editData.id;
      this.reviewForm.controls['userId'].setValue(this.editData.userId);
      this.reviewForm.controls['appointmentId'].setValue(this.editData.appointmentId);
      this.reviewForm.controls['grade'].setValue(this.editData.grade);
      this.reviewForm.controls['review'].setValue(this.editData.review);
      this.reviewForm.controls['isOke'].setValue(this.editData.isOke);
    }
  }

  addReview(){

    const test : AppointmentModel = this.reviewForm.value;
    if(this.reviewForm.valid){

    var rev = this.reviewForm.value;
    rev.id = this.id;

    if(this.actionBtn == "Add")
    
      this.reviewService.addReview(rev).subscribe(data =>{
            if(data){
              this.reviewForm.reset();
              this.dialogRef.close();
            }
        });
    else
    {
      this.reviewService.updateReview(rev).subscribe(data =>{
        if(data){
          this.reviewForm.reset();
          this.dialogRef.close();
        }
      });
    }
  }
  }

}