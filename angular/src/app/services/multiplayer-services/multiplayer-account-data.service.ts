import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MultiplayerAccountDataService {

    multiplayerMode: boolean;

    constructor(private http: HttpClient) { }

    userMultiplayerStatus(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
        this.http.get<any[]>('http://localhost/api/v1/multiplayer/status', { withCredentials: true }).subscribe(data => {
                resolve(data);
            })
        })
    }
}
