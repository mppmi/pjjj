import { Injectable } from '@angular/core';
import { Constants } from '../../config/constans';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private constants : Constants,private http: HttpClient) {}

  public async getPhoto(options?:any){ 
    let url = '';
    if(options){//ถ้ามีการส่ง options
      const id = options;
      url = this.constants.API_ENDPOINT + "/photo/" + id;
    }else{
      url = this.constants.API_ENDPOINT + "/photo";
    }
    const response = await lastValueFrom(this.http.get(url));
    console.log(url);
    return response as any[];
  }
  public async UploadPosts(userID?:any,formData?:any){
    let url = '';
    if(userID){
      url = this.constants.API_ENDPOINT + '/photo/' + userID;
    }else{
      console.log("UPLOAD FAIL...");  
    }
    const response = await lastValueFrom(this.http.post(url,formData));
    return response as any[];
  }
}
