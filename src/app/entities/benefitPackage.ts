import { IBenefit } from './benefit';

export interface IBenefitPackage {
    packageName: string;
    benefits: IBenefit[];
    grossCost: number;
    deductions: number;
    netCost: number;
}
