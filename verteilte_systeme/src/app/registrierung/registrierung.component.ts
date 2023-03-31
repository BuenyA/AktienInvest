import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

//Database URL
const baseUrl = 'http://127.0.0.1:8080/';


@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.component.html',
  styleUrls: ['./registrierung.component.scss']
})
export class RegistrierungComponent implements OnInit {  //

  hide = true;

  //Meine Form
  RegistrierungForm: FormGroup;

  // Prüfung auf Duplikate
  spielernamen = new Array<any>();

  // NEUES FORM CONTROL /////////////////////////////////////////////////////////////////////////////////
  /*
    constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private router: Router) { }
  
    ngOnInit(): void {
      this.RegistrierungForm = this.formBuilder.group({
        anrede: '',
        vorname: '',
        nachname: '',
        strasse: '',
        hausnummer: '',
        plz: '',
        stadt: '',
        spielername: '',
        email: '',
        passwort: '',
      })
    }
  
    submit(): void {
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(this.RegistrierungForm.getRawValue());
      this.http.post(baseUrl + 'api/registrierung/account-anlegen', body, { 'headers': headers }).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // alte FormContol ///////////////////////////////////////////////////////////////////////////////////////////

  constructor(private http: HttpClient, private router: Router) { }

  serverAntwort: any;

  ngOnInit() {
    this.RegistrierungForm = new FormGroup(
      {
        anrede: new FormControl('', [Validators.required]),
        vorname: new FormControl('', [Validators.required]),
        nachname: new FormControl('', [Validators.required]),
        strasse: new FormControl(),
        hausnummer: new FormControl(),
        plz: new FormControl(),
        stadt: new FormControl(),
        spielername: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), // Überprüfung des Mail Pattern
        passwort: new FormControl('', [Validators.required]),




      });
  }

  /*

  submit(RegistrierungForm: any) {
    const headers = { 'content-type': 'application/json' }
    this.http.post('api/registrierung/account-anlegen', RegistrierungForm,{ 'headers': headers }).subscribe((response) => {
      this.serverAntwort = response;
    });
  }
}

*/

  submit(): void {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.RegistrierungForm.getRawValue());
    this.http.post(baseUrl + 'api/registrierung/account-anlegen', body, { 'headers': headers }).subscribe((response) => {
      console.log(response);
      this.serverAntwort = response;// this.router.navigate(['/']); Response ist Code 200
    },
      (error) => {
        console.log(error);
        this.serverAntwort = error.error.message;// this.router.navigate(['/']);
      },




    );
  }

  //





  /*

  submit(account: any) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(account);
    return this.http.post(baseUrl + 'registrierung', body, { 'headers': headers }).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
  */


  /*
  spielernameDuplikat():boolean{
    this.http.get<any[]>('http://localhost:8080/registrierung/spielername-duplikat').subscribe(data => {
      this.spielernamen = data;
 
      if (this.RegistrierungForm.get('spielername').value )
    })
  }
*/

  /////////////////////////////////////////////////////////////////////////////////////////////////////



  /*
  email_validate = new FormControl('', [Validators.required, Validators.email]);
  spielername_validate = new FormControl('', [Validators.required]);
  passwort_validate = new FormControl('', [Validators.required]);

  getErrorMessageMail() {
    if (this.email_validate.hasError('required')) {
      return 'Bitte Mail-Adresse angeben';
    }
    return this.email_validate.hasError('email') ? 'Keine gültige Mail-Adresse' : ''; //Überprüfung, ob richtige Mail Adresse
  }

  getErrorMessageSpielername() {
    return 'Bitte Spielername angeben';
  }

  getErrorMessagePasswort() {
    return 'Bitte Passwort angeben';
  }

*/



  //Meine Variablen
  /*
 anrede: string = '';
 vorname: string = '';
 nachname: string = '';
 strasse: string = '';
 hausnummer: string = '';
 plz: string = '';
 stadt: string = '';
 spielername: string = '';
 email: string = '';
 passwort: string = ''; */





}
