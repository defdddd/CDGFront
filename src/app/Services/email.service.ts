import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppointmentModel from '../Models/AppointmentModel';
import EmailModel from '../Models/EmailModel';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private CREATE_EMAIL: string = "https://localhost:44338/SendEmail/create";
  private FINISHED_EMAIL: string = "https://localhost:44338/SendEmail/finished";
  private APPOINTMENT_EMAIL: string = "https://localhost:44338/SendEmail/appointment";
  private FORGOTSEND_EMAIL: string = "https://localhost:44338/SendEmail/forgotPasswordSend";
  private FORGOTGETTOKEN: string = "https://localhost:44338/SendEmail/forgotPasswordToken";
  private EMAIL_FROM: string = "cardetailinggarage@outlook.com";
  constructor(private http: HttpClient) {
  }


  public sendEmailWelcome(value: string) {
    var email = {
      to: value,
      from: this.EMAIL_FROM,
    }
    return this.http.post<any>(this.CREATE_EMAIL, email);
  }

  public sendEmailForgotPassword(value: string) {
    var email = {
      to: value,
      from: this.EMAIL_FROM,
    }
    return this.http.post<any>(this.FORGOTSEND_EMAIL, email);
  }

  public sendEmailRegisterAppointment(value: string) {
    var email = {
      to: value,
      from: this.EMAIL_FROM,
    }
    return this.http.post<any>(this.APPOINTMENT_EMAIL, email);
  }

  public sendEmailAppointmentDone(value: string) {
    var email = {
      to: value,
      from: this.EMAIL_FROM,
    }
    return this.http.post<any>(this.FINISHED_EMAIL, email);
  }

  public getTokenForgotPassword(value: string) {
    var email = {
      to: value,
      from: this.EMAIL_FROM,
    }
    return this.http.post<any>(this.FORGOTGETTOKEN, email);
  }
}
