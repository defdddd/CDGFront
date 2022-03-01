import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import PersonModel from 'src/app/Models/PersonModel';
import { PersonService } from 'src/app/Services/person.service';


@Component({
  selector: 'app-dialog-users',
  templateUrl: './dialog-users.component.html',
  styleUrls: ['./dialog-users.component.css']
})
export class DialogUsersComponent implements OnInit {

  userForm !: FormGroup;
  actionBtn : string = "Add";
  private id : number = 0;

  constructor(private service: PersonService, private formbuilder: FormBuilder,
     private route: Router, private dialogRef: MatDialogRef<DialogUsersComponent>,
     @Inject(MAT_DIALOG_DATA) private editData: PersonModel
     ) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      userName : ['', Validators.required],
      password : ['', Validators.required],
      name : ['', Validators.required],
      email : ['', Validators.required],
      phone : ['', Validators.required],
      isAdmin: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.id = this.editData.id;
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['phone'].setValue(this.editData.phone);
      this.userForm.controls['isAdmin'].setValue(this.editData.isAdmin.toString());
    }
  }

  addUser(){

    if(this.userForm.valid){

    var person = this.userForm.value;
    person.id = this.id;

    if(person.isAdmin == "true") 
      person.isAdmin = true;
    else
      person.isAdmin = false;

    person.phone = person.phone.toString();

    if(this.actionBtn == "Add")
      this.service.addUser(person).subscribe(data =>{
            if(data){
              this.userForm.reset();
              this.dialogRef.close();
            }
        });
    else
    {
      this.service.updateUser(person).subscribe(data =>{
        if(data){
          this.userForm.reset();
          this.dialogRef.close();
        }
      });
    }
  }
  }

}


