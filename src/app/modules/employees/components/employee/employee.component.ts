import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { Employee } from '../../../../entities/employee';
import { IEmployeeService } from '../../services/employee/iemployee.service';
import { LoggingService } from '../../../../services/logging/logging.service';
import { IPerson } from '../../../../entities/person';
import { IPayroll } from '../../../../entities/payroll';
import { IPayrollService } from '../../services/payroll/ipayroll.service';

import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee.component.html',
  styleUrls: []
})
export class EmployeeComponent implements OnInit {

  title: string;
  display = false;
  idOfEmployee: number;
  employeeForm: FormGroup;
  firstNameControl: FormControl = new FormControl('', Validators.required);
  lastNameControl: FormControl = new FormControl('', Validators.required);
  dependentsControls: FormArray = this.formBuilder.array([]);
  payroll: IPayroll;
  overlayPanel: OverlayPanel;

  constructor(@Inject('IEmployeeService') public employeeService: IEmployeeService,
              @Inject('IPayrollService') private payrollService: IPayrollService,
              public loggingService: LoggingService,
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

  public GetEmployeeFromForm() {
    if (!this.employeeForm.valid) {
      return null;
    }

    const employee = new Employee(this.idOfEmployee, this.firstNameControl.value, this.lastNameControl.value, []);
    this.dependentsControls.controls.forEach(c => {
      const person: IPerson = {
        firstName: c.value.firstName,
        lastName: c.value.lastName
      };
      employee.dependents.push(person);
    });

    return employee;
  }

  public ResetForm() {
    this.employeeForm.reset();

    while (this.dependentsControls.length) {
      this.OnRemoveDependent(0);
    }
  }
}
