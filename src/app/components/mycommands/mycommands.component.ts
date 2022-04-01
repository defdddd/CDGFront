import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Parser } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogAddReviewComponent } from 'src/app/dialogs/dialog-add-review/dialog-add-review.component';
import { DialogAppointmentComponent } from 'src/app/dialogs/dialog-appointment/dialog-appointment.component';
import { DialogSlidePictureComponent } from 'src/app/dialogs/dialog-slide-picture/dialog-slide-picture.component';

import AppointmentModel from 'src/app/Models/AppointmentModel';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-mycommands',
  templateUrl: './mycommands.component.html',
  styleUrls: ['./mycommands.component.css']
})
export class MycommandsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchForm !: FormGroup;
  data !: AppointmentModel[];
  Keys: string[] = Object.keys(new AppointmentModel(0,'0','0',"",0,0,false));
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<AppointmentModel>;
  option : string = '3';


  constructor(private auth: AuthService,private route: Router,private formbuilder: FormBuilder,
              private dialog: MatDialog, private appointmentService: AppointmentService, private _liveAnnouncer: LiveAnnouncer) 
              {
                this.displayedColumns = this.Keys;
                if(!this.auth.LoggedIn())
                this.route.navigate(['/']);
              }


  ngAfterViewInit() {
    this.setAppointments();
  }
  
  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      option : ['3', Validators.required]
    });
  }

  openDialog() {
    this.dialog.open(DialogAppointmentComponent, {
      width:"auto"
    }).afterClosed().subscribe(()=>
    {
     this.setAppointments();
    }   
  );
  }
  onChangePage(){
    this.setAppointments();
  }

  editAppointment(element: AppointmentModel){
    this.dialog.open(DialogAppointmentComponent, {
      width:"auto",
      data: element
      
    }).afterClosed().subscribe(()=>
      {
       this.setAppointments();
      }   
    );
  }

  deleteAppointment(element: AppointmentModel){
    this.appointmentService.deleteAppointment(element.id).subscribe(data =>{
      this.setAppointments();
    });
  }
  public filter(){
    this.option = this.searchForm.get('option')?.value;
    this.setAppointments();
  }

  private setAppointments(){
     this.appointmentService.GetCount().subscribe(number =>
      this.appointmentService.myAppointment(number).subscribe(
        (data: AppointmentModel[]) => {
          if(this.option === '3' || this.option === '6'){
            var int = +this.option;
            this.data = data.filter(value => 
              (new Date(value.date)) >= this.subtractMonths(int,(new Date(Date.now())))
            );
          }
          else this.data = data; 
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }));
  }

  viewPicture(element: AppointmentModel){
    this.dialog.open(DialogSlidePictureComponent, {
      data: element
    })
  }

  addReview(element: AppointmentModel){
    this.dialog.open(DialogAddReviewComponent, {
      data: element
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  private subtractMonths(numOfMonths: number, date: Date) {
    date.setMonth(date.getMonth() - numOfMonths);
    return date;
  }
}