import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import AppointmentModel from '../Models/AppointmentModel';
import GaragePictureModel from '../Models/GaragePictureModel';
import { PicturesService } from '../Services/pictures.service';

@Component({
  selector: 'app-dialog-slide-picture',
  templateUrl: './dialog-slide-picture.component.html',
  styleUrls: ['./dialog-slide-picture.component.css']
})
export class DialogSlidePictureComponent implements OnInit {
   
   Images !: GaragePictureModel[];
   ImagePath: any
   private Count: number = 0;
   
  constructor(@Inject(MAT_DIALOG_DATA) public editData: AppointmentModel, private pictureService: PicturesService, private sanitizer: DomSanitizer) 
   {

   }

  async ngOnInit() {
    (await this.pictureService.GetAppointmentPictures(this.editData.id)).subscribe(data =>{
      this.Images = data;
      this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse( this.Images[this.Count].image)}`); 
    });

  }
 next(){
  this.Count++;
  if(this.Count > this.Images.length - 1)
    this.Count = 0;

  this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse( this.Images[this.Count].image)}`); 

 }
 back(){
  this.Count--;
  if(this.Count < 0)
    this.Count = this.Images.length - 1;

  this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse( this.Images[this.Count].image)}`); 
 }

}
