import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IEmployee } from '../../../../entities/employee';
import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee.component.html',
  styleUrls: []
})
export class EmployeeEditComponent extends EmployeeComponent implements OnInit {

  title = 'Edit Employee';
  idOfEmployee: number;

  @Output() employeeUpdatedEvent = new EventEmitter<IEmployee>();

  public showDialog(employee: IEmployee) {
    if (employee == null) {
      return;
    }

    this.idOfEmployee = employee.id;
    this.firstNameControl.setValue(employee.firstName);
    this.lastNameControl.setValue(employee.lastName);

    employee.dependents.forEach(e => {
      this.OnAddDependent(e.firstName, e.lastName);
    });

    this.display = true;
  }

  public OnAccept() {
    if (!this.employeeForm.valid) {
      return;
    }

    const employee = this.GetEmployeeFromForm();

    this.employeeService.updateItem(employee).subscribe(() => {
      this.employeeUpdatedEvent.emit(employee);
      this.display = false;
      this.ResetForm();
    }, error => {
      this.loggingService.logError(error);
    });
  }

  public ResetForm() {
    this.idOfEmployee = -1;

    super.ResetForm();
  }
}
