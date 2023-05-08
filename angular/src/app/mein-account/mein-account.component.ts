import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mein-account',
    templateUrl: './mein-account.component.html',
    styleUrls: ['./mein-account.component.scss']
})

export class MeinAccountComponent implements OnInit {

    Accountdaten = new Array<any>();

    constructor(public dialog: MatDialog, public http: HttpClient, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.http.get<any[]>('http://localhost/api/v1/protected/mein-account', { withCredentials: true }).subscribe(data => {  // { withCredentials: true } sorgt dafür, dass Cookies gesendet werden dürfen (CORS)
            this.Accountdaten = data;
        })
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog result: ' + result)
        });
    }

    openEdit(): void {
        this.router.navigate(['/mein-account/accountdaten-aendern']);
    }
}
