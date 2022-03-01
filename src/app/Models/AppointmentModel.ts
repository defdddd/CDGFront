export default class AppointmentModel{
    id: number;
    userName: string;
    type: string;
    date: Date;
    price: number;
    personId: number;
    isDone: boolean;

  constructor(
    Id: number, 
    UserName: string, 
    Type: string, 
    Date: Date, 
    Price: number, 
    PersonId: number, 
    IsDone: boolean
) {
    this.id = Id
    this.userName = UserName
    this.type = Type
    this.date = Date
    this.price = Price
    this.personId = PersonId
    this.isDone = IsDone
  }



}