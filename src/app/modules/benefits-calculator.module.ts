import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeBenefitsComponent } from '../components/containers/employee-benefits/employee-benefits.component';
import { EmployeesComponent } from '../components/employees/employees.component';
import { EmployeeEditComponent } from '../components/employee/employee-edit.component';
import { EmployeeAddComponent } from '../components/employee/employee-add.component';
import { FullNameComponent } from '../components/person/full-name.component';

import { EmployeeRemoteService } from '../services/employee/employee-remote.service';
import { LoggingService } from '../services/logging/logging.service';
import { ConsoleLoggingService } from '../services/logging/console-logging.service';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

const appRoutes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesComponent },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TableModule,
        DialogModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        EmployeeBenefitsComponent,
        EmployeesComponent,
        EmployeeEditComponent,
        EmployeeAddComponent,
        FullNameComponent,
    ],
    providers: [
        { provide: 'IEmployeeService', useClass: EmployeeRemoteService },
        { provide: LoggingService, useClass: ConsoleLoggingService },
    ],
    exports: [
        EmployeeBenefitsComponent,
    ],
  })
  export class BenefitsCalculatorModule {
  }
