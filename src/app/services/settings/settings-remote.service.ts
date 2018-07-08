import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CONFIG } from '../../entities/app.constants';
import { ISettingsService } from './isettings.service';
import { IPayrollSettings } from '../../entities/payrollSettings';

@Injectable()
export class SettingsRemoteService implements ISettingsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  public get() {
    return this.http.get<IPayrollSettings>(CONFIG.urls.server + CONFIG.urls.apiPayrollSettings);
  }
}
