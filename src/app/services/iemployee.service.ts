import { Observable } from 'rxjs';
import { IEmployee } from '../entities/employee';

export interface IEmployeeService {
    getItems(): Observable<IEmployee[]>;
}
