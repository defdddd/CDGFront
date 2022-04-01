import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogMakeAppointmentComponent } from 'src/app/dialogs/dialog-make-appointment/dialog-make-appointment.component';

import { DialogUsersComponent } from 'src/app/dialogs/dialog-users/dialog-users.component';
import PersonModel from 'src/app/Models/PersonModel';
import ProfilePictureModel from 'src/app/Models/ProfilePictureModel';
import { AuthService } from 'src/app/Services/auth.service';
import { PersonService } from 'src/app/Services/person.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   profileObject: PersonModel = new PersonModel(0,'0','0','0','0','0','0',false);
   ImagePath: any;

  constructor(private auth: AuthService, private route: Router, private dialog: MatDialog, 
    private personService: PersonService, private sanitizer: DomSanitizer) {

   }

  ngOnInit(): void {
    if(!this.auth.LoggedIn())
    this.route.navigate(['/']);
    this.personService.getUser(this.auth.GetId()).subscribe(data => this.profileObject = data);
    this.personService.getProfilePicture(this.auth.GetId()).subscribe(data => {
      this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(data.image)}`);
    });
  }

getRole(){
  if(this.profileObject.isAdmin) return "Administrator";
  return "User";
}

editProfile(){
  this.dialog.open(DialogUsersComponent, {
    width:"auto",
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
    width:"auto"
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
}
