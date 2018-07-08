import { payInterval } from './globals';

export interface ISalary {
    perPeriod: number;
    interval: payInterval;
    yearly: number;
}
