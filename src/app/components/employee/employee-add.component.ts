import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { IEmployee, Employee } from '../../entities/employee';
import { IEmployeeService } from '../../services/iemployee.Service';
import { IPerson } from '../../entities/person';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee.component.html',
  styleUrls: []
})
export class EmployeeAddComponent implements OnInit {

  title = 'Add Employee';
  display = false;
  employeeForm: FormGroup;
  firstNameControl: FormControl = new FormControl('', Validators.required);
  lastNameControl: FormControl = new FormControl('', Validators.required);
  dependentsControls: FormArray = this.formBuilder.array([]);

  @Output() employeeAddedEvent = new EventEmitter<IEmployee>();

  constructor(@Inject('IEmployeeService') private employeeService: IEmployeeService,
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

  public showDialog() {
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

    this.employeeService.addItem(this.GetEmployeeFromForm()).subscribe(data => {
        this.employeeAddedEvent.emit(data);
        this.display = false;
        this.ResetForm();
      }, error => {
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

    const employeeToAdd = new Employee(-1, this.firstNameControl.value, this.lastNameControl.value, []);
    this.dependentsControls.controls.forEach(c => {
      const person: IPerson = {
        firstName: c.value.firstName,
        lastName: c.value.lastName
      };
      employeeToAdd.dependents.push(person);
    });

    return employeeToAdd;
  }

  private ResetForm() {
    this.employeeForm.reset();

    while (this.dependentsControls.length) {
      this.OnRemoveDependent(0);
    }
  }
}
