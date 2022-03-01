import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AppointmentModel from '../Models/AppointmentModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private AppointmentS_URL: string ="https://localhost:44338/Appointment/all";
  private AppointmentCOUNT : string = "https://localhost:44338/Appointment/count";
  private INSERT_URL : string = "https://localhost:44338/Appointment/insert";
  private UPDATE_URL : string = "https://localhost:44338/Appointment/update";

 constructor(private http: HttpClient, private route: Router) { 
  }

  GetAppointments(){
   return this.http.get<AppointmentModel[]>(this.AppointmentS_URL);
 }

 GetUsersPagination(pageNumber: number, pageSize: number){
   return this.http.get<AppointmentModel[]>(`https://localhost:44338/Appointment/${pageNumber}/${pageSize}`);
  }
 async GetCount(){
     let nr = await this.http.get<number>(this.AppointmentCOUNT).toPromise();
     if (typeof nr !== 'undefined')
         return nr;

     return 0;
  }

  addAppointment(value: AppointmentModel){
    console.log(value);
   return this.http.post<AppointmentModel>(this.INSERT_URL,value);
  }
  updateAppointment(value: AppointmentModel){
    return this.http.put<AppointmentModel>(this.UPDATE_URL,value);
  }

  async myAppointment(){
    const nr = await this.GetCount();
    return this.http.get<AppointmentModel[]>(`https://localhost:44338/Appointment/MyApp/1/${nr}`);
  }


  deleteAppointment(id: number){
   return this.http.delete<any>(`https://localhost:44338/Appointment/${id}`);
  }

}