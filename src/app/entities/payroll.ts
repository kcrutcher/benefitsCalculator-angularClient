import { IEmployee } from './employee';
import { IBenefitPackage } from './benefitPackage';
import { ISalary } from './salary';
import { IPayPeriod } from './payPeriod';

export interface IPayroll {
    employee: IEmployee;
    salary: ISalary;
    benefitPackage: IBenefitPackage;
    netYearlySalary: number;
    paySchedule: IPayPeriod[];
}
