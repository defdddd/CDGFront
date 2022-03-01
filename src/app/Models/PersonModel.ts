export default class PersonModel{
    id: number;
    userName: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;

  constructor(
    Id: number, 
    UserName: string, 
    Password: string, 
    Name: string, 
    Email: string, 
    Phone: string, 
    IsAdmin: boolean
) {
    this.id = Id
    this.userName = UserName
    this.password = Password
    this.name = Name
    this.email = Email
    this.phone = Phone
    this.isAdmin = IsAdmin
  }

}