import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import GaragePictureModel from '../Models/GaragePictureModel';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  private GaragePicture_URL: string ="https://localhost:44338/GaragePicture/all";
  private GaragePictureCOUNT : string = "https://localhost:44338/GaragePicture/count";
  private INSERT_URL : string = "https://localhost:44338/GaragePicture/insert";
  private UPDATE_URL : string = "https://localhost:44338/GaragePicture/update";

 constructor(private http: HttpClient, private route: Router) { 
  }

  GetGaragePicture(){
   return this.http.get<GaragePictureModel[]>(this.GaragePicture_URL);
 }

 GetUsersPagination(pageNumber: number, pageSize: number){
   return this.http.get<GaragePictureModel[]>(`https://localhost:44338/GaragePicture/${pageNumber}/${pageSize}`);
  }
 async GetCount(){
     let nr = await this.http.get<number>(this.GaragePictureCOUNT).toPromise();
     if (typeof nr !== 'undefined')
         return nr;

     return 0;
  }
  async GetAppointmentPictures(appointmentId : number){
    return this.http.get<GaragePictureModel[]>(`https://localhost:44338/GaragePicture/${appointmentId}/1/${ await this.GetCount()}`);
  }

  addGaragePicture(value: GaragePictureModel){
   return this.http.post<GaragePictureModel>(this.INSERT_URL,value);
  }
  updateGaragePicture(value: GaragePictureModel){
    return this.http.put<GaragePictureModel>(this.UPDATE_URL,value);
  }

  deleteGaragePicture(id: number){
   return this.http.delete<any>(`https://localhost:44338/GaragePicture/${id}`);
  }

}
