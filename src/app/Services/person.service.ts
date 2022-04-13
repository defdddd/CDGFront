import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import PersonModel from '../Models/PersonModel';
import ProfilePictureModel from '../Models/ProfilePictureModel';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private PERSONE_URL: string = "https://localhost:44338/Person/all";
  private PERSONCOUNT: string = "https://localhost:44338/Person/count";
  private INSERT_URL: string = "https://localhost:44338/Person/insert";
  private UPDATE_URL: string = "https://localhost:44338/Person/update";

  constructor(private http: HttpClient, private route: Router) {
  }

  GetUsers() {
    return this.http.get<PersonModel[]>(this.PERSONE_URL);
  }

  GetUsersPagination(pageNumber: number, pageSize: number) {
    return this.http.get<PersonModel[]>(`https://localhost:44338/Person/${pageNumber}/${pageSize}`);
  }
  async GetCount() {
    let nr = await this.http.get<number>(this.PERSONCOUNT).toPromise();
    if (typeof nr !== 'undefined')
      return nr;

    return 0;
  }

  addUser(person: PersonModel) {
    return this.http.post<PersonModel>(this.INSERT_URL, person);
  }
  updateUser(person: PersonModel) {
    return this.http.put<PersonModel>(this.UPDATE_URL, person);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`https://localhost:44338/Person/${id}`);
  }

  getUser(id: number) {
    return this.http.get<PersonModel>(`https://localhost:44338/Person/id/${id}`);
  }
  getProfilePicture(id: number) {
    return this.http.get<ProfilePictureModel>(`https://localhost:44338/ProfilePicture/${id}`);
  }

  setProfilePicture(value: ProfilePictureModel) {
    return this.http.post<ProfilePictureModel>(`https://localhost:44338/ProfilePicture/insert`, value);
  }
  getProfileName(id: number){
    return this.http.get<any>(`https://localhost:44338/Person/getName/${id}`);
  }

  updateProfilePicture(value: ProfilePictureModel) {
    return this.http.put<ProfilePictureModel>(`https://localhost:44338/ProfilePicture/update`, value);
  }

}