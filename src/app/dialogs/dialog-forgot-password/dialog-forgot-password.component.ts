import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { valueInRange } from 'igniteui-angular';
import { AppointmentValidator } from 'src/app/Helpers/Validators';
import { AuthService } from 'src/app/Services/auth.service';
import { EmailService } from 'src/app/Services/email.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {

  form!: FormGroup;
  boolSwitch: boolean = false;
  constructor(private fromBuilder: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService, private emailService: EmailService) {

    this.form = this.fromBuilder.group({
      email: ['', {
        validators: [Validators.required],
        asyncValidators: [AppointmentValidator.checkEmail(this.authService)]
      }],
      code: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    var code: string = this.form.get('code')?.value;
    var email = this.form.get('email')?.value;
    this.authService.ForgotPasswordLogin(email, code);
  }
  sendEmail() {
    var email = this.form.get('email')?.value;
    this.emailService.sendEmailForgotPassword(email).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Succes',
          text: ' Email sent with scuccess!',
          showConfirmButton: false,
          timer: 2000
        });
        this.form.get('email')?.disable();
        this.boolSwitch = true;
      }
    );
  }
  backlogin() {
    this.dialog.open(LoginComponent, {
      width: "auto"
    });
  }
}
