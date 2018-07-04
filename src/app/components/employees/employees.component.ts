import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { IEmployeeService } from '../../services/employee/iemployee.service';
import { IEmployee } from '../../entities/employee';
import { EmployeeEditComponent } from '../employee/employee-edit.component';
import { EmployeeAddComponent } from '../employee/employee-add.component';
import { LoggingService } from '../../services/logging/logging.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: []
})
export class EmployeesComponent implements OnInit {

  employees: IEmployee[];
  selectedEmployee: IEmployee;
  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'dependents', header: 'Number of dependents' }
  ];

  @ViewChild(EmployeeEditComponent) editEmployeeComponent: EmployeeEditComponent;
  @ViewChild(EmployeeAddComponent) addEmployeeComponent: EmployeeAddComponent;

  constructor(@Inject('IEmployeeService') private employeeService: IEmployeeService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.onGet();
  }

  onGet() {
    this.employeeService.getItems()
      .subscribe(
        (employees: IEmployee[]) => this.employees = employees,
        (error) => this.loggingService.logError(error)
      );
  }

  public onEditClick() {
    if (this.selectedEmployee == null) {
      return;
    }

    this.editEmployeeComponent.showDialog(this.selectedEmployee);
  }

  public onAddClick() {
    this.addEmployeeComponent.showDialog();
  }

  public onDeleteClick() {
    const selectedEmployeeId = this.selectedEmployee.id;
    this.employeeService.deleteItem(this.selectedEmployee).subscribe(() => {
      this.deleteEmployee(selectedEmployeeId);
    }, error => {
      this.loggingService.logError(error);
    });
  }

  public isValidForm() {
    return this.selectedEmployee != null;
  }

  employeeAdded($event) {
    this.employees.push($event);
  }

  employeeUpdated($event: IEmployee) {
    this.updateEmployee($event);
  }

  private updateEmployee(employeeUpdated: IEmployee): boolean {
    const matchingEmployee = this.employees.find(x => x.id === employeeUpdated.id);

    if (matchingEmployee == null) {
      return false;
    }

    matchingEmployee.firstName = employeeUpdated.firstName;
    matchingEmployee.lastName = employeeUpdated.lastName;
    matchingEmployee.dependents = employeeUpdated.dependents;
    return true;
  }

  private deleteEmployee(employeeId: number): boolean {
    const indexOfEmployee = this.employees.findIndex(x => x.id === employeeId);
    if (indexOfEmployee === -1) {
      return false;
    }

    this.employees.splice(indexOfEmployee, 1);
    if (this.selectedEmployee != null && this.selectedEmployee.id === employeeId) {
      this.selectedEmployee = null;
    }
    return true;
  }
}
