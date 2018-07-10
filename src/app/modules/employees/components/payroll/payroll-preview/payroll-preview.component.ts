import { Component, Input } from '@angular/core';

import { IPayroll } from '../../../../../entities/payroll';
import { payInterval } from '../../../../../entities/globals';

@Component({
  selector: 'app-payroll-preview',
  templateUrl: './payroll-preview.component.html',
  styles: [
    '#payPeriods {height:350px; overflow-y:auto}',
  ]
})
export class PayrollPreviewComponent {

  @Input() payroll: IPayroll;

  constructor() { }

  getPayIntervalString() {
    if (!this.payroll || !this.payroll.salary || !this.payroll.salary.interval) {
      return null;
    }

    return payInterval[this.payroll.salary.interval];
  }
}
