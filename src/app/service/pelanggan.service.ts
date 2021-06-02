import { Injectable } from '@angular/core';
import {Pelanggan} from '../model/pelanggan.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PelangganService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:2526/pelanggan';

  onGet(){
    return this.http.get<Pelanggan[]>(this.baseUrl);
  }

  onAdd(pelanggan: Pelanggan){
   return  this.http.post(this.baseUrl, pelanggan);
  }

  onEdit(pelanggan: Pelanggan){
    return this.http.put(this.baseUrl + '/edit', pelanggan);
  }

  onDelete(id: number){
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
