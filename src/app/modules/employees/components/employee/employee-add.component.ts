import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IEmployee } from '../../../../entities/employee';
import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee.component.html',
  styleUrls: []
})
export class EmployeeAddComponent extends EmployeeComponent implements OnInit {

  title = 'Add Employee';
  idOfEmployee = -1;

  @Output() employeeAddedEvent = new EventEmitter<IEmployee>();

  public showDialog() {
    this.display = true;
  }

  public OnAccept() {
    if (!this.employeeForm.valid) {
      return;
    }

    const employee = this.GetEmployeeFromForm();

    this.employeeService.addItem(employee).subscribe(data => {
        this.employeeAddedEvent.emit(data);
        this.display = false;
        this.ResetForm();
      }, error => {
        this.loggingService.logError(error);
      });
  }
}
