import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-account-aendern',
  templateUrl: './dialog-account-aendern.component.html',
  styleUrls: ['./dialog-account-aendern.component.scss']
})
export class DialogAccountAendernComponent {

  password_correct = false;
  hide = true;

  PasswordCheckForm: FormGroup;

  serverAntwort: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.PasswordCheckForm = new FormGroup(
      {
        passwort: new FormControl('', [Validators.required]),
      });
  }

  check_password() {

    console.log('Funktion passwort_check')

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.PasswordCheckForm.getRawValue());
    
    this.http.post('http://localhost/api/v1/protected/passwort-check/', body, { headers: headers, withCredentials: true }).subscribe((response: any) => {
      console.log("response from server = " + response.message);
      this.serverAntwort = response.message;
      if (response.message == 'Passwort korrekt!'){
        this.password_correct=true;
      }
    },
      (error) => {
        console.log(error);
        this.serverAntwort = error.error.message;
        this.password_correct = false;
      },
    );
  };
}
