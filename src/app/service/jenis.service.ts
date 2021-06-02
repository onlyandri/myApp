import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jenis} from '../model/jenis.model';


@Injectable({
  providedIn: 'root'
})
export class JenisService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:2526/jenis';

  // tslint:disable-next-line:typedef
  onGet(){
    return this.http.get<Jenis[]>(this.baseUrl);
  }

  // tslint:disable-next-line:typedef
  onGetByMaster(id: number){
    return this.http.get<Jenis[]>(this.baseUrl + '/getByMaster/' + id);
  }
}
