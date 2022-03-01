export default class ReviewModel{
    id: number;
    userId: number;
    appointmentId: number;
    grade: number;
    review: string;
    isOke: boolean;

  constructor(
    Id: number, 
    UserId: number, 
    AppointmentId: number, 
    Grade: number, 
    Review: string, 
    IsOke: boolean
) {
    this.id = Id
    this.userId = UserId
    this.appointmentId = AppointmentId
    this.grade = Grade
    this.review = Review
    this.isOke = IsOke
  }

}