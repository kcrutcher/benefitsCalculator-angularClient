import { IPerson } from './person';

export interface IEmployee extends IPerson {
    id: number;
    firstName: string;
    lastName: string;
    dependents: IPerson[];
}

export class Employee implements IEmployee {

    id: number;
    firstName: string;
    lastName: string;
    dependents: IPerson[];

    constructor(id: number, firstName: string, lastName: string, dependents: IPerson[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dependents = dependents;
    }
}
