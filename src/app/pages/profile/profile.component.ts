import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from '../../model/project_get';
import { User } from '../../model/project_get';
import { Constants } from '../../config/constans';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  uid: any;
  photoData: ImageModel[] = [];
  userData: User[] = [];

  constructor( private location : Location,private http:HttpClient, private activatedRoute: ActivatedRoute, private router: Router,private constant : Constants) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    console.log(this.uid);
  }
  ngOnInit(): void {
    this.loadDataAsync(); 
    }
    async loadDataAsync(){ 
      const url = this.constant.API_ENDPOINT;
     
      this.http.get(url+"/photo", {}).subscribe((data:any)=>{
        this.photoData = data;
      });  
      this.http.get(url+"/users", {}).subscribe((data:any)=>{
        this.userData = data;
      });  
  }
  goback(): void{
    this.location.back();
  }
  addPhoto(){
    
  }
}
