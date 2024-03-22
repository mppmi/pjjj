import { CommonModule,Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet,RouterLink } from '@angular/router';
import { Constants } from '../../config/constans';
import { ChartModule } from 'primeng/chart';
import { Row }  from '../../model/project_get';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [  CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    ChartModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {
  rankData: any[] = [];
  uid: any;
  pid: any;
  image: any;
  data7day: any[] = [];
  NumNowRank: number = 0;
  rank: number = 0;
  file?: File;
  NowRank : any[] = [];
  photoData: any[] = [];

  day: any;
  score: any;

  constructor(
    private location: Location,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private constant: Constants
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
      this.pid = params['pid'];
    });
    console.log(this.uid);
    console.log(this.pid);
    this.loadDataAsync();
    
  }

  async loadDataAsync() {
    const url = this.constant.API_ENDPOINT;

    // โหลดข้อมูลรูปภาพ
    this.http.get(url + '/photo').subscribe((data: any) => {
      this.photoData = data;
    });

    // โหลดข้อมูล rank วันล่าสุด
    this.http.get(url + '/rank/day').subscribe((data: any) => {
      this.rankData = data;
      const currentRankData = this.rankData.find(rank => rank.photoID === this.pid);
      if (currentRankData) {
        this.rank = currentRankData.ranking;
      }
    });

    // โหลดข้อมูลกราฟย้อนหลัง 7 วัน
    const data7dayResponse = await this.http.get(url + '/rank/grahp/' + this.pid).toPromise();
    if (data7dayResponse) {
      this.data7day = data7dayResponse as any[];
      if (this.data7day.length > 0) {
        this.NumNowRank = this.data7day[this.data7day.length - 1].rank;
      } else {
        this.NumNowRank = 0;
      }
    }
    
    console.log(data7dayResponse);
    // โหลดข้อมูลกราฟ
    this.loadGraph();
  }

  calculateRankDifference(photoID: number, ranking: number): number {
    const currentRank = this.photoData.findIndex(photo => photo.photoID === photoID);
    const rankDifference = ranking - (currentRank + 1);
    return rankDifference;
  }

  loadGraph() {
    const labels = this.data7day.map(day => day.formatted_date);
    const data = this.data7day.map(day => day.score);

    this.day = {
      labels: labels,
      datasets: [
        {
          label: 'Score',
          data: data,
          fill: false,
          borderColor: '#005f99',
        },
      ]
    };

    this.score = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      width: 2000,
      scales: {
        x: {
          ticks: {
            color: '#000000'
          },
          grid: {
            color: '#000000',
            borderColor: '#000000',
            borderWidth: 1,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: '#000000'
          },
          grid: {
            color: '#000000',
            borderColor: '#000000',
            borderWidth: 1,
            drawBorder: false
          }
        }
      }
    };
  }

  goback(): void {
    this.location.back();
  }
}
