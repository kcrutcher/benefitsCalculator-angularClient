import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { IEmployeeService } from '../../services/iemployee.service';
import { IEmployee } from '../../entities/employee';

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

  constructor(@Inject('IEmployeeService') private employeeService: IEmployeeService) {
  }

  ngOnInit() {
    this.onGet();
  }

  onGet() {
    this.employeeService.getItems()
      .subscribe(
        (employees: IEmployee[]) => this.employees = employees,
        (error) => console.error(error)
      );
  }
}
