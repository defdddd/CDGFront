import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import ReviewModel from 'src/app/Models/ReviewModel';
import { AuthService } from 'src/app/Services/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ReviewService } from 'src/app/Services/review.service';
import { DialogReviewComponent } from 'src/app/dialogs/dialog-review/dialog-review.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.component.html',
  styleUrls: ['./myreviews.component.css']
})
export class MyreviewsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data !: ReviewModel[];
  Keys: string[] = ['id','appointmentId','grade','review','Action'];
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<ReviewModel>;


  constructor(private auth: AuthService,private route: Router,
              private dialog: MatDialog, private reviewService: ReviewService, private _liveAnnouncer: LiveAnnouncer) 
              {
                this.displayedColumns = this.Keys;
                if(!this.auth.LoggedIn())
                this.route.navigate(['/']);
              }


  ngAfterViewInit() {
    this.setReviews();
  }
  
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogReviewComponent, {
      width:"auto",
      maxWidth:"700px"
    }).afterClosed().subscribe(()=>
        {
        this.setReviews();
        }   
      );
  }
  onChangePage(){
    this.setReviews();
  }

  editReview(element: ReviewModel){
    this.dialog.open(DialogReviewComponent, {
      width:"auto",
      maxWidth:"700px",
      data: element   
         
    }).afterClosed().subscribe(()=>
      {
       this.setReviews();
      }   
    );
  }

  deleteReview(element: ReviewModel){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor : '#3378cc',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.deleteReview(element.id).subscribe(data =>{
          this.setReviews();
        });
      } else if (result.isDismissed) {

      }
    });
  }

  private setReviews(){
    this.reviewService.getMtReviews()
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
