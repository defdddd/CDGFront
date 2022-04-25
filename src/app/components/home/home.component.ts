import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderComponent } from 'ng-image-slider';
import { SliderTrigger } from 'src/app/Helpers/SliderTrigger';
import ReviewModel from 'src/app/Models/ReviewModel';
import { EmailService } from 'src/app/Services/email.service';
import { PersonService } from 'src/app/Services/person.service';
import {PicturesService} from 'src/app/Services/pictures.service'
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  imageObject : Map<number, Array<object>>;
  @ViewChild('nav') slider !: NgImageSliderComponent;
  Reviews !: ReviewModel[];
  Image : Map<number,any>;
  Name : Map<number,string>;
  ReviewPageNumber : number = 1;

  constructor(public pictureService : PicturesService, config: NgbCarouselConfig,private sanitizer: DomSanitizer,
     private review : ReviewService, private personService: PersonService) {
      this.Image = new Map<number,any>();
      this.Name = new Map<number,string>();
      this.imageObject = new Map<number,Array<object>>();
}

  ngOnInit(): void {
    this.setReviews();
    }
  
   getImageAvatarfromId(id : number){
    this.personService.getProfilePicture(id).subscribe( value => {
      if(value)
      this.Image.set(id,this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(value.image)}`));
    });
  }

  getImagesForReview(appointmentId: number){
    this.pictureService.GetAppointmentPictures(appointmentId).subscribe(picutres => {
      var items: Array<object> = [];
      picutres.forEach(elem =>
        items.push({
          image: JSON.parse(elem.image),
          thumbImage: JSON.parse(elem.image)
        }))
      this.imageObject.set(appointmentId, items);  
    });
  }

   getProfileName(id: number){
     this.personService.getProfileName(id).subscribe(value =>{
       if(value)
       this.Name.set(id,value.name);
     });
  }

  next(){
    this.ReviewPageNumber++;
    this.setReviews();
  }
  back(){
    if(this.ReviewPageNumber > 1){
      this.ReviewPageNumber--;
      this.setReviews();
    }
  }

  triggeroff(){
    SliderTrigger.Trigger = false;
  }
  
  triggeron (){
    SliderTrigger.Trigger = true;
  }

  createRange(number : number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  private setReviews(){
    this.review.GetReviewsPag(this.ReviewPageNumber).subscribe(data => {
      if(data.length > 0){
        this.Reviews = data;
        this.Reviews.forEach(x => {
          this.getImageAvatarfromId(x.userId);
          this.getProfileName(x.userId);
          this.getImagesForReview(x.appointmentId);
        });
      }
      else{
        this.ReviewPageNumber = 0;
        this.next();
      }
    });
  }
}
