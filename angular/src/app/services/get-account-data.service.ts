import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GetAccountDataService {

    constructor(private http: HttpClient) { }

    getAccountData(): Observable<any> {
        return this.http.get<any[]>('http://localhost/api/v1/getAccountBudget', { withCredentials: true });
    }
}
