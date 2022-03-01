import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  IsAdmin: boolean = false;
  IsLoggedIn: boolean = false;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private auth: AuthService, private route: Router,  private dialog: MatDialog) {
    this.IsAdmin = auth.IsAdmin();
    this.IsLoggedIn = auth.LoggedIn();
   }
  
  ngOnInit(): void {
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
  showFiller = false;

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
