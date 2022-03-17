import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { SliderTrigger } from './Helpers/SliderTrigger';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './Services/auth.service';
import { PersonService } from './Services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarDetailingGarage';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  IsAdmin: boolean = false;
  IsLoggedIn: boolean = false;
  ImagePath : any;
  Name : any;
  constructor(private auth: AuthService, private route: Router,  private dialog: MatDialog,
    private observer: BreakpointObserver, private personService: PersonService, private sanitizer: DomSanitizer) {
    this.IsAdmin = auth.IsAdmin();
    this.IsLoggedIn = auth.LoggedIn();
    }
  ngOnInit(): void {
    if(this.IsLoggedIn){
      this.personService.getUser(this.auth.GetId()).subscribe(data => this.Name = data.name);
      this.personService.getProfilePicture(this.auth.GetId()).subscribe(data => {
        this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(data.image)}`);
      });
     }
  }

  LogIn(){
    this.dialog.open(LoginComponent, {
    });
  }

  Register(){
    this.dialog.open(RegisterComponent, {
    });
  }

  Logout(){
    this.auth.LogOut();
  }

  onSelect(){
    if(this.IsLoggedIn)
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  tirggerSlider(){
    if(this.IsLoggedIn)
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (!res.matches) {
        if(SliderTrigger.Trigger){
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }else{
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }    
    });
    
  }
  ngAfterViewInit() {
    if(this.IsLoggedIn)
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }



}

