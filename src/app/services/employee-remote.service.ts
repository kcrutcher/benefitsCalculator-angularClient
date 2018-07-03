import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployeeService } from './iemployee.Service';
import { IEmployee } from '../entities/employee';
import { CONFIG } from '../entities/app.constants';

@Injectable()
export class EmployeeRemoteService implements IEmployeeService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  public getItems() {
    return this.http.get<IEmployee[]>(CONFIG.urls.server + CONFIG.urls.apiEmployee);
  }
}
