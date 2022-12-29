import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Axios } from 'axios';
import { StorageService } from './storage.service';
// import { environment } from 'src/environments/environment';

export interface ApiResult {
  success: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  headerOptions: any = {
    // Authorization: '',
  };

  paramsOption: any = {
    production_unit_id: '',
  };

  constructor(private http: HttpClient, private storage: StorageService) {
    // console.log('Set Token');
  }

  async initHeader() {
    /** Set Token */
    const token = await this.storage.get('token');
    this.headerOptions.Authorization = token;
  }

  async initParam(params) {
    /** Set Production Unit */
    const production_unit_id = await this.storage.get('production_unit_id');
    if (production_unit_id) {
      this.paramsOption.production_unit_id = production_unit_id;
      return Object.assign({}, params, this.paramsOption);
    } else {
      return params;
    }
  }

  async getting(uri, params) {
    let data: any;

    await this.initHeader();
    params = await this.initParam(params);

    data = this.http
      .get(`${environment.baseUrl}/${uri}`, {
        headers: this.headerOptions,
        params: params,
      })
      .toPromise();

    return data;
  }

  post(uri, body, params): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/${uri}`, body, {
      headers: this.headerOptions,
      params: params,
    });
  }

  // async post(uri, body, params) {
  //   let data: any;

  //   await this.initHeader();

  //   data = this.http
  //     .post<any>(`${environment.baseUrl}/${uri}`, body, {
  //       headers: this.headerOptions,
  //       params: params,
  //     })
  //     .toPromise();

  //   return data;
  // }

  async getData(module_uri, page?) {
    let uri = `lookup/${module_uri}`;
    let data = [];

    await this.getting(uri, { order: 'created_at', limit: 12, page }).then(
      (res) => {
        data = res.data.data;
      }
    );

    return data;
  }
}
