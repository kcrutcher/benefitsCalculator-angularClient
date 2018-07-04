import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { IEmployee, Employee } from '../../entities/employee';
import { IEmployeeService } from '../../services/employee/iemployee.service';
import { LoggingService } from '../../services/logging/logging.service';
import { IPerson } from '../../entities/person';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee.component.html',
  styleUrls: []
})
export class EmployeeEditComponent implements OnInit {

  title = 'Edit Employee';
  display = false;
  idOfEmployee: number;
  employeeForm: FormGroup;
  firstNameControl: FormControl = new FormControl('', Validators.required);
  lastNameControl: FormControl = new FormControl('', Validators.required);
  dependentsControls: FormArray = this.formBuilder.array([]);

  @Output() employeeUpdatedEvent = new EventEmitter<IEmployee>();

  constructor(@Inject('IEmployeeService') private employeeService: IEmployeeService,
              private loggingService: LoggingService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      employee: this.formBuilder.group({
        firstName: this.firstNameControl,
        lastName: this.lastNameControl,
        }),
      dependents: this.dependentsControls
    });
  }

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

  public OnAddDependent(dependentFirstName: string, dependentLastName: string) {
    const addrCtrl = this.formBuilder.group({
      firstName: [dependentFirstName, Validators.required],
      lastName: [dependentLastName, Validators.required],
      });

    this.dependentsControls.push(addrCtrl);
  }

  public OnRemoveDependent(i: number) {
    this.dependentsControls.removeAt(i);
  }

  public OnAccept() {
    if (!this.employeeForm.valid) {
      return;
    }

    const updatedEmployee = this.GetEmployeeFromForm();

    this.employeeService.updateItem(updatedEmployee).subscribe(data => {
      this.employeeUpdatedEvent.emit(updatedEmployee);
      this.display = false;
      this.ResetForm();
    }, error => {
      this.loggingService.logError(error);
    });
  }

  public OnCancel() {
    this.display = false;
    this.ResetForm();
  }

  private GetEmployeeFromForm() {
    if (!this.employeeForm.valid) {
      return null;
    }

    const updatedEmployee = new Employee(this.idOfEmployee, this.firstNameControl.value, this.lastNameControl.value, []);
    this.dependentsControls.controls.forEach(c => {
      const person: IPerson = {
        firstName: c.value.firstName,
        lastName: c.value.lastName
      };
      updatedEmployee.dependents.push(person);
    });

    return updatedEmployee;
  }

  private ResetForm() {
    this.employeeForm.reset();
    this.idOfEmployee = -1;

    while (this.dependentsControls.length) {
      this.OnRemoveDependent(0);
    }
  }
}
