import { Observable } from 'rxjs';
import { IEmployee } from '../../../../entities/employee';

export interface IEmployeeService {
    addItem(employee: IEmployee): Observable<IEmployee>;
    updateItem(employee: IEmployee): Observable<IEmployee>;
    deleteItem(employee: IEmployee): Observable<Object>;
    getItems(): Observable<IEmployee[]>;
}
