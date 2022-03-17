import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogAddReviewComponent } from '../dialog-add-review/dialog-add-review.component';
import { DialogAppointmentComponent } from '../dialog-appointment/dialog-appointment.component';
import { DialogSlidePictureComponent } from '../dialog-slide-picture/dialog-slide-picture.component';
import AppointmentModel from '../Models/AppointmentModel';
import { AppointmentService } from '../Services/appointment.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-mycommands',
  templateUrl: './mycommands.component.html',
  styleUrls: ['./mycommands.component.css']
})
export class MycommandsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data !: AppointmentModel[];
  Keys: string[] = Object.keys(new AppointmentModel(0,'0','0',"",0,0,false));
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<AppointmentModel>;


  constructor(private auth: AuthService,private route: Router,
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

  private  setAppointments(){
     this.appointmentService.GetCount().subscribe( number =>
      this.appointmentService.myAppointment(number).subscribe(
        (data: AppointmentModel[]) => {
          this.data = data; 
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
}