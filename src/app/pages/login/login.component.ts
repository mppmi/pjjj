import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constans';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  id : any;
  
  constructor(private location: Location, private http: HttpClient,private router: Router,private constant : Constants) {}

  goback(): void {
    this.location.back();
  }

login(email: HTMLInputElement, password: HTMLInputElement): void {
  const url = this.constant.API_ENDPOINT + "/login";
  
  this.http.get(url,{
    params:{
      email : email.value,
      password : password.value
    }
  }).subscribe((data: any)=>{
    this.id = data.userID;
    console.log(this.id);
    this.router.navigate([""],{queryParams : {uid : this.id}});
  });
}


  signup(email: HTMLInputElement, name: HTMLInputElement, password: HTMLInputElement, image: HTMLInputElement): void {
    const url = this.constant.API_ENDPOINT + "/login";
    this.http.post(url, {
        email : email.value,
        username : name.value,
        password : password.value,
        avatar : image.value
    }).subscribe((data: any) => {
      console.log(data);
    });

  }
  
}
