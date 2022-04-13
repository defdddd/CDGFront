import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { DialogMakeAppointmentComponent } from 'src/app/dialogs/dialog-make-appointment/dialog-make-appointment.component';
import { DialogUsersComponent } from 'src/app/dialogs/dialog-users/dialog-users.component';
import PersonModel from 'src/app/Models/PersonModel';
import ProfilePictureModel from 'src/app/Models/ProfilePictureModel';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';
import { PersonService } from 'src/app/Services/person.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  profileObject: PersonModel = new PersonModel(0,'0','0','0','0','0','0',false);
  ImagePath: any;
  appointments !: number;
  reviews !: number;
  rating !: number;
  enableChart : boolean = false;
  getColor : any ;
  constructor(private auth: AuthService, private route: Router, private dialog: MatDialog, 
    private personService: PersonService, private appointmentService: AppointmentService, 
    private reviewService: ReviewService, private sanitizer: DomSanitizer) {

   }

  ngOnInit(): void {
    if(!this.auth.LoggedIn())
       this.route.navigate(['/']);
    else{
      this.personService.getUser(this.auth.GetId()).subscribe(data => this.profileObject = data);
      this.personService.getProfilePicture(this.auth.GetId()).subscribe(data => {
        this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(data.image)}`);
        this.setChart();
      });
       }
   
  }

getRole(){
  if(this.profileObject.isAdmin) return "Administrator";
  return "User";
}

editProfile(){
  this.dialog.open(DialogUsersComponent, {
    width:"auto",
      maxWidth:"700px",
    data: this.profileObject
    
  }).afterClosed().subscribe( val =>
    {
      if(val)
      this.profileObject = JSON.parse(val);
    }   
  );
}

makeAppointment(){
  this.dialog.open(DialogMakeAppointmentComponent, {
    data: this.profileObject,
    width:"auto",
      maxWidth:"700px"
  }).afterClosed().subscribe(()=>{
    this.setChart();
  });
}

async addPicture(event : any){
    
  for(let i = 0; i < event.target.files.length; i++){

    let byteArray  = await this.base64(event.target.files[i]);
    var picture = new ProfilePictureModel;
    picture.id = 0;
    picture.userId = this.auth.GetId();
    picture.image = JSON.stringify(byteArray);
    this.personService.getProfilePicture(this.auth.GetId()).subscribe(data => 
      {
       if(data)
          this.personService.updateProfilePicture(picture).subscribe(data =>{
            this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(data.image)}`);
            window.location.reload();

          });
        else
          this.personService.setProfilePicture(picture).subscribe(data => 
            this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(data.image)}`));
            window.location.reload();

     });
  };
}

base64(file: any){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

public barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: {
    x: {},
    y: {
      min: 0
    }
  },
  plugins: {
    legend: {
      display: true,
    }
  }
};
public barChartType: ChartType = 'bar';
public barChartPlugins = [];
public barChartData !: ChartData<'bar'>;

public randomize(): void {
  // Only Change 3 values
  this.barChartData.datasets[0].data = [
    Math.round(Math.random() * 100),
    59,
    80,
    Math.round(Math.random() * 100),
    56,
    Math.round(Math.random() * 100),
    40 ];

  this.chart?.update();
}

enableBar(): void{
  if(this.enableChart)
    this.enableChart = false;
  else
    this.enableChart = true;
}


private setChart(){
  this.appointmentService.myAppointment().subscribe(x =>{    
    this.appointments = 0;
    x.forEach(() => this.appointments++);
    this.reviewService.getMtReviews().subscribe(revs =>{
      this.reviews = 0;
      this.rating = 0;
      revs.forEach((x) => {this.reviews++; this.rating += x.grade;});
      let result = this.rating / this.reviews
      switch(true){
        case result <= 6:
          this.getColor = "color: red;";
          break;
        case result > 6 && result < 7.5:
          this.getColor = "color: orange;";
          break;
        case result >= 7.5:
          this.getColor = "color: green;";
          break;
      }


      this.barChartData = {
        labels: [ 'Activity information'],
        datasets: [
          { data: [ this.appointments ], label: 'Appointments' },
          { data: [ this.rating / this.reviews], label: 'Average Rating Given' },
          { data: [ this.reviews ], label: 'Reviews' }      
        ]
      };
    });
});
}

}

