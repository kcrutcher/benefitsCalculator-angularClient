import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeEditComponent } from './components/employee/employee-edit.component';
import { EmployeeAddComponent } from './components/employee/employee-add.component';
import { FullNameComponent } from './components/person/full-name.component';
import { PayrollPreviewComponent } from './components/payroll/payroll-preview/payroll-preview.component';

import { EmployeeRemoteService } from './services/employee/employee-remote.service';
import { PayrollRemoteService } from './services/payroll/payroll-remote.service';
import { LoggingService } from '../../services/logging/logging.service';
import { ConsoleLoggingService } from '../../services/logging/console-logging.service';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TableModule,
        DialogModule,
        BrowserAnimationsModule,
        OverlayPanelModule,
    ],
    declarations: [
        EmployeesComponent,
        EmployeeEditComponent,
        EmployeeAddComponent,
        FullNameComponent,
        PayrollPreviewComponent,
    ],
    providers: [
        { provide: 'IEmployeeService', useClass: EmployeeRemoteService },
        { provide: 'IPayrollService', useClass: PayrollRemoteService },
        { provide: LoggingService, useClass: ConsoleLoggingService },
    ],
    exports: [
        EmployeesComponent,
    ],
  })
  export class EmployeesModule {
  }
