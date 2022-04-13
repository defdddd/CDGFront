import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { IgxToastComponent } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/dialogs/login/login.component';
import PersonModel from 'src/app/Models/PersonModel';
import { AuthService } from 'src/app/Services/auth.service';
import { EmailService } from 'src/app/Services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder, private auth: AuthService, private route: Router, private emailService: EmailService,
    private dialog: MatDialog, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.form = this.fromBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }
  login() {
    this.dialog.open(LoginComponent, {
      width: "auto"
    });
  }
  submit(): void {
    if (this.form.valid) {
      const username = this.form.get("username")?.value;
      const password = this.form.get("password")?.value;
      const confirmpassword = this.form.get("confirmpassword")?.value;
      const name = this.form.get("name")?.value;
      const gender = this.form.get("gender")?.value;
      const email = this.form.get("email")?.value;
      const phone = this.form.get("phone")?.value;

      if (confirmpassword == password) {
        var person = new PersonModel(0, username, password, name, gender, email, phone, false);
        this.auth.Register(person).subscribe(data => {
          if (data) {
            this.emailService.sendEmailWelcome(person.email).subscribe(x => x);
            Swal.fire('Welcome!', 'Account created with succes', 'success');
            this.form.reset();
            this.dialogRef.close();
          }
        });
      }
      else {
        Swal.fire('Hey!', 'Password does not match', 'warning');
      }
    }
  }
}
