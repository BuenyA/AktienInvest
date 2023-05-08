import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  serverAntwort: any;

  delete_account() {

    console.log('Funktion delete_account')
    this.http.delete('http://localhost/api/v1/protected/account-loeschen/', { withCredentials: true }).subscribe((response) => {
      console.log(response);
      this.serverAntwort = response;
      this.authService.logout();
    },
      (error) => {
        console.log(error);
      },
    )
  };
}
