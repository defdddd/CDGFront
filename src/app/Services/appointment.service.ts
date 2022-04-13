import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AppointmentModel from '../Models/AppointmentModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private AppointmentS_URL: string = "https://localhost:44338/Appointment/all";
  private AppointmentCOUNT: string = "https://localhost:44338/Appointment/count";
  private INSERT_URL: string = "https://localhost:44338/Appointment/insert";
  private UPDATE_URL: string = "https://localhost:44338/Appointment/update";

  constructor(private http: HttpClient, private route: Router) {
  }

  GetAppointments() {
    return this.http.get<AppointmentModel[]>(this.AppointmentS_URL);
  }

  GetUsersPagination(pageNumber: number, pageSize: number) {
    return this.http.get<AppointmentModel[]>(`https://localhost:44338/Appointment/${pageNumber}/${pageSize}`);
  }
  GetCount() {
    return this.http.get<number>(this.AppointmentCOUNT);
  }

  addAppointment(value: AppointmentModel) {
    console.log(value);
    return this.http.post<AppointmentModel>(this.INSERT_URL, value);
  }
  updateAppointment(value: AppointmentModel) {
    return this.http.put<AppointmentModel>(this.UPDATE_URL, value);
  }

  myAppointment() {
    return this.http.get<AppointmentModel[]>(`https://localhost:44338/Appointment/MyApp`);
  }

  checkAppointmentDate(date: any) {
    return this.http.get<boolean>(`https://localhost:44338/Appointment/dateVal/` + date);
  }

  deleteAppointment(id: number) {
    return this.http.delete<any>(`https://localhost:44338/Appointment/${id}`);
  }
  getCurrentDates() {
    return this.http.get<string[]>('https://localhost:44338/Appointment/dates');
  }
}