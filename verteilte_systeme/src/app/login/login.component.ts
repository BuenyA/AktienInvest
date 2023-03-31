import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Database URL
const baseUrl = 'http://127.0.0.1:8080/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  hide = true;

  //Meine Form
  LoginForm: FormGroup;

  constructor(private http: HttpClient) { }

  serverAntwort: any;

  ngOnInit() {
    this.LoginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        passwort: new FormControl('', [Validators.required]),
      });
  }

  submit(): void {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.LoginForm.getRawValue());
    this.http.post(baseUrl + 'api/login', body, { 'headers': headers }).subscribe((response) => {
      console.log(response);
      this.serverAntwort = response;// this.router.navigate(['/']); Response ist Code 200
    },
      (error) => {
        console.log(error);
        this.serverAntwort = error.error.message;// this.router.navigate(['/']);
      },
    );
  }

}
