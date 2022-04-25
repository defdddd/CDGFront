import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordTrigger } from 'src/app/Helpers/ChangePasswordTrigger';
import PersonModel from 'src/app/Models/PersonModel';
import { AuthService } from 'src/app/Services/auth.service';
import { PersonService } from 'src/app/Services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form !: FormGroup;
  private person !: PersonModel;

  constructor(private formbuilder: FormBuilder, private personService: PersonService,
    private dialogRef: MatDialogRef<ForgotpasswordComponent>, private auth: AuthService, private route: Router) 
  {
    if(!ChangePasswordTrigger.ChangePasswordTrigger) this.route.navigate(['/']);
  }

  ngOnInit(): void {
      this.personService.getUser(this.auth.GetId()).subscribe( person => {
        this.person = person;
        });
        this.form = this.formbuilder.group({
          password: ['', Validators.required],
          cPassword: ['',Validators.required]
        });
  }


  change(){
    if(this.form.valid)
    {
      var password = this.form.get('password')?.value;
      var cPassword = this.form.get('cPassword')?.value;
      if(cPassword == password){
        this.person.password = password;
        this.personService.updateUser(this.person).subscribe( x => {
          if(x) {
            Swal.fire({
              icon: 'success',
              title: 'Succes',
              text: ' Password Changed!',
              showConfirmButton: false,
              timer: 2000
            });
            this.dialogRef.close();
          }
        });
      }
      else
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: ' Passwords does not match!',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
}
