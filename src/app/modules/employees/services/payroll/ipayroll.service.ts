import { Observable } from 'rxjs';

import { IEmployee } from '../../../../entities/employee';
import { IPayroll } from '../../../../entities/payroll';

export interface IPayrollService {
    previewPayroll(employee: IEmployee): Observable<IPayroll>;
}
