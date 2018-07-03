import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeBenefitsComponent } from '../components/containers/employee-benefits/employee-benefits.component';
import { EmployeesComponent } from '../components/employees/employees.component';

import { EmployeeRemoteService } from '../services/employee-remote.service';

import { TableModule } from 'primeng/table';

const appRoutes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesComponent },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        TableModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        EmployeeBenefitsComponent,
        EmployeesComponent,
    ],
    providers: [
        { provide: 'IEmployeeService', useClass: EmployeeRemoteService },
    ],
    exports: [
        EmployeeBenefitsComponent,
    ],
  })
  export class BenefitsCalculatorModule {
  }
