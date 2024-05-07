import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';

  tasks:any=[];
  newtask="";
  newName="";
  newEmail="";
  newPassword="";
  users:any=[];
  isLogin= true;
  isCreate=false;
  nameLogin="";
  passwordLogin="";
  APIURL="http://localhost:8000/";

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.get_users();
  }

  hideCreate(){
    this.isLogin = true;
    this.isCreate = false;
  }
  hideLogin(){
    this.isLogin=false;
    this.isCreate=true;
  }
  
  get_tasks(){
    this.http.get(this.APIURL+"get_tasks").subscribe((res) => {
        this.tasks=res;
      })
  }
  get_users(){
    this.http.get(this.APIURL+"get_users").subscribe((res) => {
      this.users=res;
    })
  }

  add_task(){
    let body = new FormData();
    body.append('task', this.newtask);
    this.http.post(this.APIURL+'add_task',body).subscribe((res) => {
        alert(res)
        this.newtask="";
        this.get_tasks();
      })
  }
  add_user(){
    let body= new FormData();
    body.append('name', this.newName);
    body.append('email', this.newEmail);
    body.append('password', this.newPassword);
    this.http.post(this.APIURL+'add_user',body).subscribe((res) => {
      alert(res)
      this.newName="";
      this.newEmail="";
      this.newPassword="";
      this.get_users();
    })
  }

 del_task(id:any){
  let body = new FormData();
  body.append('id', id);
  this.http.post(this.APIURL+'del_task',body).subscribe((res) => {
      alert(res)
      this.get_tasks();
    })
 } 
}
