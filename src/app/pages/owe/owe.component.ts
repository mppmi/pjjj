import { CommonModule,Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ImageModel } from '../../model/project_get';
import { ActivatedRoute, Router, RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-owe',
  standalone: true,
  imports: [ CommonModule,MatButtonModule,RouterOutlet,RouterLink],
  templateUrl: './owe.component.html',
  styleUrl: './owe.component.scss'
})
export class OweComponent {
  uid: any;
  userData: any[] = [];

  constructor( private location : Location,private http:HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    console.log(this.uid);
  }
  goback(): void{
    this.location.back();
  }
  ngOnInit(): void {
    this.loadDataAsync(); 
    }
    async loadDataAsync(){ 
      const url = `http://localhost:3000`;
     
      this.http.get(url+"/users").subscribe((data:any)=>{
        this.userData = data;
        console.log(this.userData);
      });
     
      
      console.log('Call Name Completed');   
  }
}