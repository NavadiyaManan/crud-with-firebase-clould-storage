import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SeriveService } from './serive.service';
import { data } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // editForm!:FormGroup;
  formValue!:FormGroup;
  getData !:any;
  employeeData !:any;
  constructor(private service: SeriveService){}

  ngOnInit(): void {
    this.formValue=new FormGroup({
     
      fname:new FormControl(''),
      lname:new FormControl(''),
      email:new FormControl(''),
      salary:new FormControl('')
    })

   
    this.getEmp()
  }
  title = 'crud';

  dataObj : data={
   id:'',
    fname: '',
    lname: '',
    email: '',
    salary: ''
  }
  get fname(){ return this.formValue.get('fname');}
  get lname(){ return this.formValue.get('lname');}
  get email(){ return this.formValue.get('email');}
  get salary(){ return this.formValue.get('salary');}


  // get E_fname(){ return this.formValue.get('fname');}
  // get E_lname(){ return this.formValue.get('lname');}
  // get E_email(){ return this.formValue.get('email');}
  // get E_salary(){ return this.formValue.get('salary');}
  submit(){}


  AddEmp(){
    const {value}=this.formValue
    console.log(value);
    // this.dataObj.id='',
    this.dataObj.fname=value.fname,
    this.dataObj.lname=value.lname,
    this.dataObj.email=value.email,
    this.dataObj.salary=value.salary
    
    this.service.addEmp(this.dataObj).then((res:any)=>{
      if(res){
        alert("Employee  added")
        this.dataObj
      }
    });
  }

  getEmp(){
    this.service.getEmp().subscribe((res:data[])=>{
      console.log("data",res)
      this.getData=res
    })  
  }
  deleteEmp(data:any){
    let decision=confirm("Are you want to Delete Data ?");
    if(decision==true){
      this.service.deleteEmp(data);
      }
    }

    edit(row:any){
      // this.employeeData.id=row.id;
      this.dataObj=row;
      this.formValue.controls['fname'].setValue(row.fname);
      this.formValue.controls['lname'].setValue(row.lname);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['salary'].setValue(row.salary);
    }

  updateEmp(data:data){
    
    const {value}=this.formValue
    console.log(value);

      (this.dataObj.fname=value.fname),
      (this.dataObj.lname=value.lname),
      (this.dataObj.email=value.email),
      (this.dataObj.salary=value.salary);
     this.service.updateEmp(this.dataObj,value).then(()=>{
      alert("Data edited Successfully")
     });

     this.formValue.reset()
  }
}


