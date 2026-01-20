import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  employeeObj: EmployeeModel = new EmployeeModel();
  employeList: EmployeeModel[] = [];
  isEdit: boolean = false;

  epmloyeeForm = new FormGroup({
    empid: new FormControl(this.employeeObj.empid, {validators:[Validators.required]}),
    name: new FormControl(this.employeeObj.name, {validators:[Validators.required]}),
    email: new FormControl(this.employeeObj.email, {validators:[Validators.required]}),
    contactNo: new FormControl(this.employeeObj.contactNo, {validators:[Validators.required]}),
    city: new FormControl(this.employeeObj.city, {validators:[Validators.required]}),
    state: new FormControl(this.employeeObj.state, {validators:[Validators.required]}),
    pincode: new FormControl(this.employeeObj.pincode, {validators:[Validators.required]}),
    address: new FormControl(this.employeeObj.address, {validators:[Validators.required]}),
  });

  constructor() {
    this.loadEmployeeData();
  }
  loadEmployeeData() {
    const empdata = localStorage.getItem('empdata');
    if (empdata != null) {
      this.employeList = JSON.parse(empdata);
    }
  }

  onSubmit() {
    const empdata = localStorage.getItem('empdata');
    if (empdata != null) {
      this.employeList = JSON.parse(empdata);
      this.epmloyeeForm.controls['empid'].setValue(empdata.length + 1);
      this.employeList.unshift(this.epmloyeeForm.value as EmployeeModel);
    } else {
      this.employeList.unshift(this.epmloyeeForm.value as EmployeeModel);
    }
    localStorage.setItem('empdata', JSON.stringify(this.employeList));

    //reset form after every submission
    this.epmloyeeForm.reset();
  }

  editEmpdata(emp: EmployeeModel) {
    this.isEdit = true;
    this.epmloyeeForm.patchValue({
      empid: emp.empid,
      name: emp.name,
      email: emp.email,
      contactNo: emp.contactNo,
      city: emp.city,
      state: emp.state,
      pincode: emp.pincode,
      address: emp.address,
    });
  }

  onUpdate() {
    this.isEdit = true;
    let empdata = this.epmloyeeForm.controls['empid'].value;
    let data = this.employeList.find((item) => item.empid == empdata);
    if (data != undefined) {
      data.email = this.epmloyeeForm.controls['email'].value ?? '';
      data.name = this.epmloyeeForm.controls['name'].value ?? '';
      data.contactNo = this.epmloyeeForm.controls['contactNo'].value ?? '';
    }
    localStorage.setItem('empdata', JSON.stringify(this.employeList));
    this.epmloyeeForm.reset();
    this.isEdit = false;
  }

  deleteEmp(empid: number) {
    this.employeList = this.employeList.filter((item) => item.empid != empid);
    localStorage.setItem('empdata', JSON.stringify(this.employeList));
  }
}
