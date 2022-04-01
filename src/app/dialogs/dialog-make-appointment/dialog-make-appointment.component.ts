import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import AppointmentModel from 'src/app/Models/AppointmentModel';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { DateHelper } from 'src/app//Helpers/DateHelper';
import { AppointmentValidator } from 'src/app//Helpers/Validators';
import { AuthService } from 'src/app//Services/auth.service';


@Component({
  selector: 'app-dialog-make-appointment',
  templateUrl: './dialog-make-appointment.component.html',
  styleUrls: ['./dialog-make-appointment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogMakeAppointmentComponent implements OnInit {

  AppointmentForm !: FormGroup;
  private Appointment !: AppointmentModel;
  minDate : any = new Date;
  myFilter : any;
  dateClass : any;
  private dateHelper !: DateHelper;

  constructor(private auth: AuthService, private appointmentService: AppointmentService, 
    private formbuilder: FormBuilder, private dialogRef: MatDialogRef<DialogMakeAppointmentComponent>) {}

  ngOnInit(): void {
    this.dateHelper = new DateHelper(this.appointmentService);
    this.myFilter = this.dateHelper.myFilter;
    this.dateClass = this.dateHelper.dateClass;
    this.Appointment = new AppointmentModel(0,"","","",0,this.auth.GetId(),false);
    this.AppointmentForm = this.formbuilder.group({
      userName : ['', Validators.required],
      type : ['', Validators.required],
      date : ['', {
        validators: [Validators.required],
        asyncValidators: [AppointmentValidator.checkDate(this.appointmentService)]}]
    });
  }

  addAppointment(){

    if(this.AppointmentForm.valid){
      this.Appointment.userName = this.AppointmentForm.get("userName")?.value;
      this.Appointment.date = DateHelper.getDate(this.AppointmentForm.get("date")?.value);
      this.Appointment.type = this.AppointmentForm.get("type")?.value;
      this.setPrice(this.Appointment.type);
      this.appointmentService.addAppointment(this.Appointment).subscribe(data =>{
        if(data){
          this.AppointmentForm.reset();
          this.dialogRef.close();
        }
      });
    }
  }

  private setPrice(value: any){
    switch(value) { 
      case "Full": { 
         this.Appointment.price = 900;
         break; 
      } 
      case "Interior": { 
        this.Appointment.price = 350;
        break; 
     } 
     case "Exterior": { 
      this.Appointment.price = 650;
      break; 
   } 
      default: { 
         //statements; 
         break; 
      } 
   } 
  }
}