import { Injectable } from '@angular/core';
import { Constants } from '../../config/constans';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private constants : Constants,private http: HttpClient) {}

  public async getScore(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/vote/score/' + id;
    }else{
      console.log("GET SCORE FAIL...");
    }
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }
}
