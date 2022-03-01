export default class ReviewerPictureModel {
    id: number;
    reviewId: number;
    appointmentId: number;
    fileName: string;
    imagePath: string;

  constructor(
    Id: number, 
    ReviewId: number, 
    AppointmentId: number, 
    FileName: string, 
    ImagePath: string
) {
    this.id = Id
    this.reviewId = ReviewId
    this.appointmentId = AppointmentId
    this.fileName = FileName
    this.imagePath = ImagePath
  }
}