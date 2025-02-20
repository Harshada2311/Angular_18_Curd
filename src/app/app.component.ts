import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  employeeForm: FormGroup = new FormGroup({});

 employeeObj: Employee = new Employee();
  employeeList: Employee[] =[];
  
  constructor()
  {
    this.createForm()
     //debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null)
    {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }
  createForm(){
    this.employeeForm = new FormGroup({

      empid: new FormControl(this.employeeObj.empid),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailid: new FormControl(this.employeeObj.emailid),
      state: new FormControl(this.employeeObj.state),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
      address: new FormControl(this.employeeObj.address),

    })
  }
  onSave(){
   //debugger;
    const oldData = localStorage.getItem("EmpData")
    if(oldData != null)
    {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length +1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
   
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    this.employeeObj = new Employee();
    this.createForm();
  }
  onEdit(item:Employee) {
    this.employeeObj = item;
    this.createForm()

  }
  onUpdate(){
    const records = this.employeeList.find(m=>m.empid == this.employeeForm.controls['empid'].value);
    if(records != undefined){
      records.address = this.employeeForm.controls['address'].value;
      records.emailid = this.employeeForm.controls['emailid'].value;
      records.contactNo = this.employeeForm.controls['contactNo'].value;
      records.name = this.employeeForm.controls['name'].value;
      records.city = this.employeeForm.controls['city'].value;
      records.state = this.employeeForm.controls['state'].value;
      records.pinCode = this.employeeForm.controls['pinCode'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    this.employeeObj = new Employee();
    this.createForm();

  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure want to Delete ");
    if(isDelete)
    {
      const index = this.employeeList.findIndex(m=>m.empid== id)
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList))

    }

  }

}
