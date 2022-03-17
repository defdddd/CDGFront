import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogAppointmentComponent } from '../dialog-appointment/dialog-appointment.component';
import AppointmentModel from '../Models/AppointmentModel';
import { AppointmentService } from '../Services/appointment.service';
import { PicturesService } from '../Services/pictures.service';
import { AuthService } from '../Services/auth.service';
import GaragePictureModel from '../Models/GaragePictureModel';
import { DialogSlidePictureComponent } from '../dialog-slide-picture/dialog-slide-picture.component';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: any;


  data !: AppointmentModel[];
  Keys: string[] = Object.keys(new AppointmentModel(0,'0','0',"",0,0,false));
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<AppointmentModel>;


  constructor(private auth: AuthService,private route: Router,private pictureService: PicturesService,
              private dialog: MatDialog, private appointmentService: AppointmentService, private _liveAnnouncer: LiveAnnouncer) 
              {
                this.Keys.push("Action");
                this.displayedColumns = this.Keys;
                if(!this.auth.LoggedIn() || !this.auth.IsAdmin())
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
      });
  }

  async addPicture(element: AppointmentModel, event : any){
    
    for(let i = 0; i < event.target.files.length; i++){

      console.log(event.target.files[i]);
      let byteArray  = await this.base64(event.target.files[i]);

      var picutre = new GaragePictureModel(0, element.id,event.target.files[i].name, JSON.stringify(byteArray));

      this.pictureService.addGaragePicture(picutre).subscribe(data => console.log(data));
    };
  }
  
  viewPicture(element: AppointmentModel){
    this.dialog.open(DialogSlidePictureComponent, {
      data: element
    })
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

  private setAppointments(){
    this.appointmentService.GetAppointments()
        .subscribe(data => {
          this.data = data; 
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  fileToByteArray(file : any) : any {
    return new Promise((resolve, reject) => {

        try {
            let reader = new FileReader();
            let fileByteArray : any = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target!.readyState == FileReader.DONE) {
                  if(evt.target?.result && typeof evt.target.result != "string"){
                    let arrayBuffer : ArrayBuffer = evt.target!.result;
                         let array = new Uint8Array(arrayBuffer);
                        for (const byte of array) 
                          fileByteArray.push(byte);
                      }
                  }
                  resolve(fileByteArray);
                  }                 
                }
                    
        catch (e) {
            reject(e);
        } 
    })
}

base64(file: any){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

}