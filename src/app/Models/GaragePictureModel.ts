export default class GaragePictureModel {
    id: number;
    appointmentId: number;
    fileName: string;
    image: string	;

  constructor(
    Id: number, 
    AppointmentId: number, 
    FileName: string, 
    Image: string	
) {
    this.id = Id
    this.appointmentId = AppointmentId
    this.fileName = FileName
    this.image = Image
  }

}