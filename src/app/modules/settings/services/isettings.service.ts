import { Observable } from 'rxjs';

import { IPayrollSettings } from '../../../entities/payrollSettings';

export interface ISettingsService {
    get(): Observable<IPayrollSettings>;
}
