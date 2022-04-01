import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderComponent } from 'ng-image-slider';
import { SliderTrigger } from 'src/app/Helpers/SliderTrigger';
import {PicturesService} from 'src/app/Services/pictures.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  imageObject: Array<object> = [];
  @ViewChild('nav') slider !: NgImageSliderComponent;

  constructor(public pictureService : PicturesService, config: NgbCarouselConfig ) {

}

  ngOnInit(): void {
    this.pictureService.GetGaragePicture().subscribe( picutres =>
      picutres.forEach(elem =>
        this.imageObject.push({
          image: JSON.parse(elem.image),
          thumbImage: JSON.parse(elem.image)
        })
        )
      );
      }
   
  triggeroff(){
    SliderTrigger.Trigger = false;
  }
  
  triggeron (){
    SliderTrigger.Trigger = true;
  }
}
