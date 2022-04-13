import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AppointmentModel from 'src/app/Models/AppointmentModel';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { PicturesService } from 'src/app/Services/pictures.service';
import { DialogAppointmentComponent } from 'src/app/dialogs/dialog-appointment/dialog-appointment.component';
import GaragePictureModel from 'src/app/Models/GaragePictureModel';
import { DialogSlidePictureComponent } from 'src/app/dialogs/dialog-slide-picture/dialog-slide-picture.component';
import { DateHelper } from 'src/app/Helpers/DateHelper';
import { EmailService } from 'src/app/Services/email.service';
import { PersonService } from 'src/app/Services/person.service';
import Swal from 'sweetalert2';
import { R3TargetBinder } from '@angular/compiler';


@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: any;
  checked: boolean = false;


  data !: AppointmentModel[];
  Keys: string[] = Object.keys(new AppointmentModel(0,'0','0',"",0,0,false));
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<AppointmentModel>;
  searchForm !: FormGroup;

  constructor(private auth: AuthService,private route: Router,private pictureService: PicturesService, private formbuilder: FormBuilder,private emailService : EmailService,
              private dialog: MatDialog, private appointmentService: AppointmentService, private _liveAnnouncer: LiveAnnouncer, private personService : PersonService) 
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
    this.searchForm = this.formbuilder.group({
      option : ['', Validators.required],
      value: ['']
    });
  }

  openDialog() {
    this.dialog.open(DialogAppointmentComponent, {
      width:"auto",
      maxWidth:"700px"
    }).afterClosed().subscribe(()=>
      {
      this.setAppointments();
      });
  }

  async addPicture(element: AppointmentModel, event : any){
    
    for(let i = 0; i < event.target.files.length; i++){

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
      maxWidth:"700px",
      data: element
      
    }).afterClosed().subscribe((data)=>
      {
       if(data.isDone)
          this.personService.getUser(data.personId).subscribe(user => 
            this.emailService.sendEmailAppointmentDone(user.email).subscribe(x => x)
            );
       this.setAppointments();
      }   
    );
  }

  deleteAppointment(element: AppointmentModel){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this appointment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor : '#3378cc',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(element.id).subscribe(data =>{
          this.setAppointments();
        });
      } else if (result.isDismissed) {

      }
    });
  }

  private setAppointments(){
    this.appointmentService.GetAppointments()
        .subscribe(data => {
          this.data = this.checked ? data.filter(x => x.isDone === false) : data;  
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
  isDoneFilter(){
   this.setAppointments();
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

getDateType() {
  if(this.searchForm.get('option')?.value)
  return this.searchForm.get('option')?.value === "date";
  return false;
}

search(){
  var value = this.searchForm.get('value')?.value;

  if(this.searchForm.valid && value !=''){
      this.appointmentService.GetAppointments().subscribe(dates => {
        var data = this.checked ? dates.filter(x => x.isDone === false) : dates; 
        switch(this.searchForm.get('option')?.value){
          case('name'): 
              this.data = data.filter( x => x.userName.toLowerCase().includes(value.toLowerCase())); 
           break;
           case('idnumber'): 
              this.data = data.filter( x => x.id === +value);
           break;
           case('date'): 
              var date = DateHelper.getDate(value)
              
              if(new Date(date) < new Date('01-01-2000'))
               this.data = data;
              else
              this.data = data.filter( x => x.date === date);
           break;
        }
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
  else
    this.setAppointments();  
}

private debounce(cb : any, delay = 1000){
  let timeout: NodeJS.Timeout 
  return() =>{
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      cb()
    },delay)
  }
}

}