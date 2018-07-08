import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { IEmployee, Employee } from '../../entities/employee';
import { IEmployeeService } from '../../services/employee/iemployee.Service';
import { LoggingService } from '../../services/logging/logging.service';
import { IPerson } from '../../entities/person';
import { IPayrollService } from '../../services/payroll/ipayroll.service';
import { IPayroll } from '../../entities/payroll';

import { OverlayPanel } from 'primeng/overlaypanel';

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
  payroll: IPayroll;
  overlayPanel: OverlayPanel;

  @Output() employeeAddedEvent = new EventEmitter<IEmployee>();

  constructor(@Inject('IEmployeeService') private employeeService: IEmployeeService,
              @Inject('IPayrollService') private payrollService: IPayrollService,
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
        this.loggingService.logError(error);
      });
  }

  public OnCancel() {
    this.display = false;
    this.ResetForm();
  }

  public OnPreviewPayroll(event, overlayPanel: OverlayPanel) {
    const employeeToPreview = this.GetEmployeeFromForm();

    if (employeeToPreview) {
      this.payrollService.previewPayroll(employeeToPreview).subscribe(data => {
        this.payroll = data;
        this.overlayPanel = overlayPanel;
        overlayPanel.toggle(event);
      }, error => {
        this.loggingService.logError(error);
        this.payroll = null;
      });
    }
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
