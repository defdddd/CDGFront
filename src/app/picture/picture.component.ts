import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import GaragePictureModel from '../Models/GaragePictureModel';
import { AuthService } from '../Services/auth.service';
import { PicturesService } from '../Services/pictures.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogPictureComponent } from '../dialog-picture/dialog-picture.component';


@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data !: GaragePictureModel[];
  Keys: string[] = Object.keys(new GaragePictureModel(0,0,"0",""));
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<GaragePictureModel>;


  constructor(private auth: AuthService,private route: Router,private _sanitizer: DomSanitizer,
              private dialog: MatDialog, private pictureService: PicturesService, private _liveAnnouncer: LiveAnnouncer) 
              {
                this.Keys.push("Action");
                this.displayedColumns = this.Keys;
                if(!this.auth.LoggedIn() || !this.auth.IsAdmin())
                this.route.navigate(['/']);
              }


  ngAfterViewInit() {
    this.setPicutres();
  }
  
  ngOnInit(): void {
  }

 
  onChangePage(){
    this.setPicutres();
  }

  deletePicture(element: GaragePictureModel){
    this.pictureService.deleteGaragePicture(element.id).subscribe(data =>{
      this.setPicutres();
    });
  }
  viewPicture(element: GaragePictureModel){
    this.dialog.open(DialogPictureComponent, {
      data: element     
    });
  }

  private setPicutres(){
    this.pictureService.GetGaragePicture()
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
}
