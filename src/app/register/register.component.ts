import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import PersonModel from '../Models/PersonModel';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fromBuilder: FormBuilder, private auth: AuthService, private route: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<RegisterComponent>) { 
      this.form = this.fromBuilder.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required]],
      phone:['',[Validators.required]],
      username:['',[Validators.required]],
      gender:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required]]
    });
 }

  ngOnInit(): void {
   
  }
  login(){
    this.dialog.open(LoginComponent, {
      width:"auto"
    });   
}
  submit(): void{
    if(this.form.valid){
      const username = this.form.get("username")?.value;
      const password = this.form.get("password")?.value;
      const confirmpassword = this.form.get("confirmpassword")?.value;
      const name = this.form.get("name")?.value;
      const gender = this.form.get("gender")?.value;
      const email = this.form.get("email")?.value;
      const phone = this.form.get("phone")?.value;

      if(confirmpassword == password){
        var person = new PersonModel(0,username,password,name,gender,email,phone,false);  
        this.auth.Register(person).subscribe(data =>{
              if(data){
                alert("Account created with succes");
                this.route.navigate(['/login']);
                this.form.reset();
                this.dialogRef.close();           
              }
          });
      }
      else{
        alert("Passwords dont match");
      }
    }
  }
}
