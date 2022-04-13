import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import GaragePictureModel from 'src/app/Models/GaragePictureModel';

@Component({
  selector: 'app-dialog-picture',
  templateUrl: './dialog-picture.component.html',
  styleUrls: ['./dialog-picture.component.css']
})
export class DialogPictureComponent implements OnInit {

  ImagePath: any;

  constructor(@Inject(MAT_DIALOG_DATA) public editData: GaragePictureModel, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(this.editData.image)}`);
  }
}
