import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Master} from '../model/master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {  }


  baseUrl = 'http://localhost:2526/master';

  onGet(){
    return this.http.get<Master[]>(this.baseUrl);
  }

}
