import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import ReviewModel from '../Models/ReviewModel';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private REVIEWS_URL: string = "https://localhost:44338/Review/all";
  private MYREV_URL: string = "https://localhost:44338/Review/MyRev";
  private REVIEWCOUNT: string = "https://localhost:44338/Review/count";
  private INSERT_URL: string = "https://localhost:44338/Review/insert";
  private UPDATE_URL: string = "https://localhost:44338/Review/update";

  constructor(private http: HttpClient, private route: Router) {
  }

  GetReviews() {
    return this.http.get<ReviewModel[]>(this.REVIEWS_URL);
  }

  GetReviewsPag(pageNumber: number) {
    return this.http.get<ReviewModel[]>(`https://localhost:44338/Review/${pageNumber}/3`);
  }
  async GetCount() {
    let nr = await this.http.get<number>(this.REVIEWCOUNT).toPromise();
    if (typeof nr !== 'undefined')
      return nr;

    return 0;
  }

  addReview(value: ReviewModel) {
    return this.http.post<ReviewModel>(this.INSERT_URL, value);
  }
  getMtReviews() {
    return this.http.get<ReviewModel[]>(this.MYREV_URL);
  }
  updateReview(value: ReviewModel) {
    return this.http.put<ReviewModel>(this.UPDATE_URL, value);
  }

  deleteReview(id: number) {
    return this.http.delete<any>(`https://localhost:44338/Review/${id}`);
  }

}