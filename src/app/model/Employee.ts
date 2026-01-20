export class EmployeeModel {
  empid: number;
  name: string;
  city: string;
  state: string;
  email: string;
  contactNo: string;
  address: string;
  pincode:string

  constructor() {
    this.address = '';
    this.city = '';
    this.contactNo = '';
    this.email = '';
    this.empid = 1;
    this.name = '';
    this.state = '';
    this.pincode=''
  }
}
