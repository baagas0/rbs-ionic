import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Axios } from 'axios';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
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

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private alertController: AlertController,
    private authService: AuthService
  ) {
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
      params = Object.assign({}, params, this.paramsOption);
    }

    if (params['date[]']) {
      const date = await this.storage.get('date');
      console.log("date", date)
      params['date[]'] = [date.from, date.to || moment().format('YYYY-MM-DD')];
    }
    console.log(`params['date[]']`, params['date[]'])

    if (params['custom_date[]']) {
      params['date[]'] = params['custom_date[]'];
      delete params['custom_date[]'];
    }

    return params;
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
      .toPromise()
      .catch(async (err) => {

        if(err?.error?.error_message == "Unauthorized") {
          await this.authService.logout();
        } else {
          
          const alert = await this.alertController.create({
            // header: 'Alert',
            subHeader: 'Error',
            message: err.error.error_message,
            buttons: ['OK'],
          });
  
          await alert.present();

        }

      });

    return data;
  }

  post(uri, body, params): Observable<any> {
    let data = this.http
      .post(`${environment.baseUrl}/${uri}`, body, {
        headers: this.headerOptions,
        params: params,
      })
      .pipe(
        tap((data) => console.log('server data:', data)),
        catchError(this.handleError('getData'))
      );
    return data;
  }

  private handleError(operation: String) {
    return async (err: any) => {
      let errMsg = `error in ${operation}() retrieving`;

      console.log(err.error.error_message);

      const alert = await this.alertController.create({
        // header: 'Alert',
        subHeader: 'Error',
        message: err.error.error_message,
        buttons: ['OK'],
      });

      await alert.present();

      return Observable.throw(errMsg);
    };
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
