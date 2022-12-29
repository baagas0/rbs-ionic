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

  constructor(private http: HttpClient, private storage: StorageService) {
    // console.log('Set Token');
  }

  async initToken() {
    /** Set Token */
    const token = await this.storage.get('token');
    this.headerOptions.Authorization = token;
  }

  async getting(uri, params) {
    let data: any;

    await this.initToken();

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
