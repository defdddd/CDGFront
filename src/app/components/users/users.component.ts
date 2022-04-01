import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogUsersComponent } from 'src/app/dialogs/dialog-users/dialog-users.component';
import PersonModel from 'src/app/Models/PersonModel';
import { AuthService } from 'src/app/Services/auth.service';
import { PersonService } from 'src/app/Services/person.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data !: PersonModel[];
  Keys: string[] = Object.keys(new PersonModel(0,'0','0','0','0','0','0',false));
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<PersonModel>;
  searchForm !: FormGroup;


  constructor(private auth: AuthService,private route: Router,private formbuilder: FormBuilder,
              private dialog: MatDialog, private userService: PersonService, private _liveAnnouncer: LiveAnnouncer) 
              {
                this.Keys.push("Action");
                this.displayedColumns = this.Keys;
                if(!this.auth.LoggedIn() || !this.auth.IsAdmin())
                this.route.navigate(['/']);
              }


  ngAfterViewInit() {
    this.setUsers();
  }
  
  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      option : ['', Validators.required],
      value: ['']
    });
  }

  openDialog() {
    this.dialog.open(DialogUsersComponent, {
      width:"auto"
    }).afterClosed().subscribe( val =>
      {
       this.setUsers();
      }   
    );;
  }
  onChangePage(){
    this.setUsers();
  }

  editUser(element: PersonModel){
    this.dialog.open(DialogUsersComponent, {
      width:"auto",
      data: element
      
    }).afterClosed().subscribe( val =>
      {
       this.setUsers();
      }   
    );
  }

  deleteUser(element: PersonModel){
    this.userService.deleteUser(element.id).subscribe(data =>{
      this.setUsers();
    });
  }

  private setUsers(){
    this.userService.GetUsers()
        .subscribe(data => {
          this.data = data; 
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

  search(){
    var value = this.searchForm.get('value')?.value;

    if(this.searchForm.valid && value !=''){
        this.userService.GetUsers().subscribe(data => {
          switch(this.searchForm.get('option')?.value){
            case('username'): 
                this.data = data.filter( x => x.userName.toLowerCase().includes(value.toLowerCase())); 
             break;
             case('email'): 
                this.data = data.filter( x => x.email.toLowerCase().includes(value.toLowerCase()));
             break;
             case('name'): 
                this.data = data.filter( x => x.name.toLowerCase().includes(value.toLowerCase()));
             break;
          }
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

    }
    else
      this.setUsers();  
  }
}








