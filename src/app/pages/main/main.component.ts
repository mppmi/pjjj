import { Component } from '@angular/core';
import { RouterModule, RouterOutlet,RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { ImageModel } from '../../model/project_get';
import { Constants } from '../../config/constans';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [  RouterModule,
    RouterOutlet,
    RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  uid: any;
  photoData: ImageModel[] = [];

  constructor( private location : Location,private http:HttpClient, private activatedRoute: ActivatedRoute, private router: Router,private constant : Constants) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    console.log(this.uid);
  }
  goback(): void{
    this.location.back();
  }
}
