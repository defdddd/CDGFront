export default class PersonModel{
    id: number;
    userName: string;
    password: string;
    name: string;
    gender: string;
    email: string;
    phone: string;
    isAdmin: boolean;

  constructor(
    Id: number, 
    UserName: string, 
    Password: string, 
    Name: string, 
    gender: string,
    Email: string, 
    Phone: string, 
    IsAdmin: boolean
) {
    this.id = Id
    this.userName = UserName
    this.password = Password
    this.name = Name
    this.gender = gender
    this.email = Email
    this.phone = Phone
    this.isAdmin = IsAdmin
  }

}