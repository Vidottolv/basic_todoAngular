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
  name="";
  email="";
  password="";
  users:any=[];
  isLogin= true;

  APIURL="http://localhost:8000/";

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.get_users();
  }

  hide(){
    this.isLogin = !this.isLogin;
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
    body.append('name', this.name);
    body.append('email', this.email);
    body.append('password', this.password);
    this.http.post(this.APIURL+'add_user',body).subscribe((res) => {
      alert(res)
      this.name="";
      this.email="";
      this.password="";
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
