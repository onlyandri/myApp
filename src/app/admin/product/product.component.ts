import { Component, OnInit } from '@angular/core';
import {PelangganService} from '../../service/pelanggan.service';
import {Pelanggan} from '../../model/pelanggan.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {JenisService} from '../../service/jenis.service';
import {Jenis} from '../../model/jenis.model';
import {MasterService} from '../../service/master.service';
import {Master} from '../../model/master.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title: any;
  pelanggans: Pelanggan[];
  jenis: Jenis[];
  jenisByMasster: Jenis[];
  master: Master[];
  public editPelanggan: Pelanggan;
  // tslint:disable-next-line:max-line-length
  public deletePelanggan: Pelanggan;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private service: PelangganService, private serviceJenis: JenisService, private serviceMaster: MasterService) {
    this.title = 'product';
  }

  ngOnInit(): void {
   this.getPelanggan();
   this.getJenis();
   this.getMaster();
  }

  // tslint:disable-next-line:typedef
  getPelanggan(){
    this.service.onGet().subscribe(data => {
      this.pelanggans = data;
    });
  }

  // tslint:disable-next-line:typedef
  getJenis(){
    this.serviceJenis.onGet().subscribe(result => {
      this.jenis = result;
    });
  }

  // tslint:disable-next-line:typedef
  getMaster(){
    this.serviceMaster.onGet().subscribe(result => {
      this.master = result;
    });
  }

  // tslint:disable-next-line:typedef
 public onTambahPelanggan(form: NgForm): void{
    console.log(form.value);
    this.service.onAdd(form.value).subscribe(response => {
        console.log(response);
        // @ts-ignore
        document.getElementById('btl').click();
        this.alertWithSuccess();
        this.getPelanggan();
      },
      (error: HttpErrorResponse) => {
        this.erroalert();
      }
    );
  }

  // tslint:disable-next-line:typedef
  checkConsole(d: Pelanggan){
    console.log(d);
  }

  public onEditPelanggan(pelanggan: Pelanggan): void{
    this.service.onEdit(pelanggan).subscribe(() => {
        // @ts-ignore
        document.getElementById('btl2').click();
        this.alertWithSuccess();
        this.getPelanggan();
      },
      (error: HttpErrorResponse) => {
      this.erroalert();
      }
    );
  }

  public onDeletePelanggan(id: any): void{
    this.service.onDelete(id).subscribe(() => {
        // @ts-ignore
        document.getElementById('btl3').click();
        this.alertWithSuccess();
        this.getPelanggan();
      },
      (error: HttpErrorResponse) => {
      this.erroalert();
      }
    );
  }

  // tslint:disable-next-line:typedef
  getJenisByMaster(id: any){
    this.serviceJenis.onGetByMaster(id.target.value).subscribe(data => {
        this.jenisByMasster = data;
      });
  }

  // tslint:disable-next-line:typedef
  cekEdit(pelanggan: Pelanggan){
    console.log(pelanggan);
  }

  // tslint:disable-next-line:typedef
  getJenisById(id: number){

  }

//   onChangeSelect(id: number){
//   this.getJenis(id);
// }

  // tslint:disable-next-line:typedef
  public onOpenModal(pelanggan: Pelanggan, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit'){
      this.editPelanggan = pelanggan;
      button.setAttribute('data-target', '#editModal');
    }
    if (mode === 'hapus'){
      this.deletePelanggan = pelanggan;
      button.setAttribute('data-target', '#hapusModal');
     }

    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  // tslint:disable-next-line:typedef
  alertWithSuccess(){
      Swal.fire('BERHASIL ...!', 'data berhasil di modifikasi', 'success')
  }
  // tslint:disable-next-line:typedef
  erroalert()
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: ''
    });
  }

}
