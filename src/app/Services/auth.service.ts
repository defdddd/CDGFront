import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { catchError, Observable, throwError } from 'rxjs';
import { Token } from '../Interfaces/Token';
import AuthModel from '../Models/AuthModel';
import PersonModel from '../Models/PersonModel';
import TokenModel from '../Models/TokenModel';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_REQUEST: string = "https://localhost:44338/Auth";
  private REGISTER_REQUEST: string = "https://localhost:44338/Auth/register";
  private CHECK_EMAIL: string = "https://localhost:44338/Auth/email/";
  private FORGOT_EMAIL: string = "https://localhost:44338/SendEmail/forgotPasswordToken/";
  private AUTH: string = "loggedIn";

  constructor(private http: HttpClient, private route: Router) {
    this.CheckToken();
  }

  Register(person: PersonModel): Observable<boolean> {
    return this.http.post<boolean>(this.REGISTER_REQUEST, person);
  }

  Auth(auth: AuthModel): any {
    return this.http.post<TokenModel>(this.AUTH_REQUEST, auth).subscribe(data => {
      this.setAuth(data);
      window.location.reload();
    });
  }

  CheckEmail(email: string) {
    return this.http.get<boolean>(this.CHECK_EMAIL + email);
  }

  ForgotPasswordLogin(email: string, code: string) {
    return this.http.get<TokenModel>(this.FORGOT_EMAIL + email + '/' + code).subscribe(data => {
      this.setAuth(data);
      window.location.reload();
    });
  }

  GetToken(): string {
    const value = localStorage.getItem(this.AUTH);
    if (!!value)
      return (JSON.parse(value) as TokenModel).access_Token;

    return "NULL";
  }

  LoggedIn(): boolean {

    if (this.GetToken() == "NULL") return false;
    return true;
  }
  IsAdmin(): boolean {
    if (this.GetToken() == "NULL") return false;
    var token = jwtDecode<Token>(this.GetToken());
    return token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Admin";
  }

  GetId(): number {
    if (this.GetToken() == "NULL") return -1;
    var token = jwtDecode<Token>(this.GetToken());
    return token.Identifier;
  }

  LogOut() {
    localStorage.removeItem(this.AUTH);
    window.location.reload();
  }

  private setAuth(token: TokenModel) {
    if (token.userName == "" && token.access_Token == "")
      localStorage.removeItem(this.AUTH);
    else localStorage.setItem(this.AUTH, JSON.stringify(token));
  }

  private CheckToken(): void {
    if (this.GetToken() !== "NULL") {
      var token = jwtDecode<Token>(this.GetToken());
      if (Date.now() >= token.exp * 1000) {
        this.LogOut();
      }
    }
  }
}


