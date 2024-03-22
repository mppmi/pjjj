
import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {  HttpClient,HttpClientModule } from '@angular/common/http';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'
import { ImageModel } from '../../model/project_get';
import { VoteService } from '../../services/api/vote.service';
import { PhotoService } from '../../services/api/photo.service';
import { ActivatedRoute, RouterOutlet,RouterLink } from '@angular/router';
import { Constants } from '../../config/constans';
@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule,MatButtonModule,HttpClientModule,MatBottomSheetModule, RouterOutlet,RouterLink],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit{
  uid: any;
  photoData: ImageModel[] = [];
  image: any[] = [];
  score: any[] = [];
  canClick: boolean = true;;
  image1: any;
  image2: any;
  score1: any = 0;
  score2: any = 0;
  showPopup: boolean = false;
  countdown : any;

  constructor( private location : Location,private http:HttpClient,private voteService: VoteService,private photoService: PhotoService, private activatedRoute: ActivatedRoute,private constant : Constants) {
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    this.loadDataAsync(); 
    this.canClick = true;
  }
  async loadDataAsync() { 

    this.image = await this.photoService.getPhoto();
    console.log(this.image);
    this.image1 = this.image[getRandomIndex(this.image)];
    do {
      this.image2 = this.image[getRandomIndex(this.image)];
    } while (this.image2 === this.image1);

      this.score = await this.voteService.getScore(this.image1.photoID);
      this.score1 = this.score[0].total_score;
      if(this.score1 == null){
        this.score1 = 0;
      }
      this.score = await this.voteService.getScore(this.image2.photoID);
      this.score2 = this.score[0].total_score;
      if(this.score2 == null){
        this.score2 = 0;
      }
    }
  
  goback(): void{
    this.location.back();
  }

  vote(WinPid: Number, LosePid: Number, check: Number): void {
    if (this.canClick) {
      const K = 32;
      const EA = 1 / (1 + 10 ** ((this.score2 - this.score1) / 400));
      const EB = 1 / (1 + 10 ** ((this.score1 - this.score2) / 400));      
  
      const url = this.constant.API_ENDPOINT+`/vote`;
      console.log('คะแนนของภาพที่ 1: ', this.score1);
      console.log('คะแนนของภาพที่ 2: ', this.score2);

      if (check == 1) {
        //กรณี A ชนะ
        const RA = K * (1 - EA);
        console.log(RA);
        const RB = K * (0 - EB);
        console.log(RB);
        this.http
          .post(url + '/win', {
            photoID: WinPid,
            score: RA,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
        this.http
          .post(url + '/lose', {
            photoID: LosePid,
            score: RB,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
      } else if (check == 2) {
        //กรณี ฺB ชนะ
        const RA = K * (0 - EA);
        console.log(RA);
        const RB = K * (1 - EB);
        console.log(RB);
        this.http.post(url + '/win', {
          photoID: WinPid,
            score: RA,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
        this.http.post(url + '/lose', {
          photoID: LosePid,
            score: RB,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
      }
      this.showPopup = true;
      this.canClick = false;
      this.countdown = 3; // เซ็ตค่าเวลานับถอยหลัง
      const intervalId = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(intervalId); // หยุดการนับถอยหลังเมื่อถึง 0
          this.showPopup = false;
          this.loadDataAsync();
          this.canClick = true;
        }
      }, 1000);
    }
  }

}
function getRandomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}