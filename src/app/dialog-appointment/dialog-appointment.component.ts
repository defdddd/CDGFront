import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import AppointmentModel from 'src/app/Models/AppointmentModel';
import PersonModel from 'src/app/Models/PersonModel';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { PersonService } from 'src/app/Services/person.service';


@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.css']
})
export class DialogAppointmentComponent implements OnInit {

  AppointmentForm !: FormGroup;
  actionBtn : string = "Add";
  private id : number = 0;
  users !: PersonModel[];

  constructor(private personService: PersonService, private appointmentService: AppointmentService, private formbuilder: FormBuilder,
     private route: Router, private dialogRef: MatDialogRef<DialogAppointmentComponent>,
     @Inject(MAT_DIALOG_DATA) private editData: AppointmentModel
     ) { 
       this.personService.GetUsers().subscribe(data => this.users = data);
     }

  ngOnInit(): void {
    this.AppointmentForm = this.formbuilder.group({
      userName : [{value: '', disabled: this.actionBtn == "Update"}, Validators.required],
      type : ['', Validators.required],
      date : ['', Validators.required],
      personId : ['', Validators.required],
      isDone: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.id = this.editData.id;
      this.AppointmentForm.controls['userName'].setValue(this.editData.userName);
      this.AppointmentForm.controls['type'].setValue(this.editData.type);
      this.AppointmentForm.controls['date'].setValue(this.editData.date);
      this.AppointmentForm.controls['personId'].setValue(this.editData.personId);
      this.AppointmentForm.controls['isDone'].setValue(this.editData.isDone);

    }
  }

  addAppointment(){

    if(this.AppointmentForm.valid){

    var rev = this.AppointmentForm.value;
    rev.id = this.id;

    if(rev.isDone == "true") 
    rev.isDone = true;
    else
    rev.isDone = false;

    this.setPrice(rev);

    if(this.actionBtn == "Add")
      this.appointmentService.addAppointment(rev).subscribe(data =>{
        console.log(data);
            if(data){
              this.AppointmentForm.reset();
              this.dialogRef.close();
            }
        });
    else
    {
      this.appointmentService.updateAppointment(rev).subscribe(data =>{
        if(data){
          this.AppointmentForm.reset();
          this.dialogRef.close();
        }
      });
    }
  }
  else{
    console.log("da");
  }
  }

  private setPrice(value: any){
    switch(value.type) { 
      case "Full": { 
         value.price = 900;
         break; 
      } 
      case "Interior": { 
        value.price = 350;
        break; 
     } 
     case "Exterior": { 
      value.price = 650;
      break; 
   } 
      default: { 
         //statements; 
         break; 
      } 
   } 
  }

}