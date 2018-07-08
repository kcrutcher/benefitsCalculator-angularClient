import { IPerson } from './person';

export interface IBenefit {
    beneficiary: IPerson;
    grossCost: number;
    discounts: number[];
    netCost: number;
}
