import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}

  public rupiah(amount: string, prefix = undefined) {

    let number_string = amount.replace(/[^,\d]/g, '').toString();
    let split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    let separator = '';

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    console.log(rupiah);
    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  }
}
