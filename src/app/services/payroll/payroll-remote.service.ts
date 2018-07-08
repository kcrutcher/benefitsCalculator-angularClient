import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IEmployee } from '../../entities/employee';
import { IPayrollService } from './ipayroll.service';
import { CONFIG } from '../../entities/app.constants';
import { IPayroll } from '../../entities/payroll';

@Injectable()
export class PayrollRemoteService implements IPayrollService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  public previewPayroll(employee: IEmployee) {
    if (employee == null) {
      return;
    }

    return this.http.post<IPayroll>(CONFIG.urls.server + CONFIG.urls.apiPayroll, employee, this.httpOptions);
  }
}
