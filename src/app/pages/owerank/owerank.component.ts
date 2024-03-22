import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Constants } from '../../config/constans';

@Component({
  selector: 'app-owerank',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './owerank.component.html',
  styleUrl: './owerank.component.scss'
})
export class OwerankComponent {
  constructor( private location : Location,private constant : Constants) {
  }
  goback(): void{
    this.location.back();
  }
}
