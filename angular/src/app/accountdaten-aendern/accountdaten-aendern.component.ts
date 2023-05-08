import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAccountAendernComponent } from './dialog-account-aendern/dialog-account-aendern.component';

@Component({
  selector: 'app-accountdaten-aendern',
  templateUrl: './accountdaten-aendern.component.html',
  styleUrls: ['./accountdaten-aendern.component.scss']
})
export class AccountdatenAendernComponent implements OnInit {

  hide = true;

  //Meine Form
  EditForm: FormGroup;

  // Prüfung auf Duplikate
  spielernamen = new Array<any>();

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  Accountdaten = new Array<any>();
  serverAntwort: any;


  ngOnInit() {
    this.http.get<any[]>('http://localhost/api/v1/protected/mein-account', { withCredentials: true }).subscribe(data => {
      this.Accountdaten = data;

      this.EditForm.patchValue({
        anrede: this.Accountdaten[0].ANREDE,
        vorname: this.Accountdaten[0].VORNAME,
        nachname: this.Accountdaten[0].NACHNAME,
        strasse: this.Accountdaten[0].STRASSE,
        hausnummer: this.Accountdaten[0].HAUSNUMMER,
        plz: this.Accountdaten[0].PLZ,
        stadt: this.Accountdaten[0].STADT,
        spielername: this.Accountdaten[0].SPIELERNAME,
        email: this.Accountdaten[0].EMAIL,
        passwort: ''
      });


      /*  this.EditForm.controls['selectedAnrede'].setValue(this.Accountdaten[0].ANREDE) */
    });


    this.EditForm = new FormGroup(
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
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        passwort: new FormControl(''),
      });
  }

  submit(): void {

    var dialogAnswer;
    let dialogRef = this.dialog.open(DialogAccountAendernComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ' + result)
      dialogAnswer = result;
      console.log(dialogAnswer)

      if (dialogAnswer == "true") {


        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(this.EditForm.getRawValue());
        this.http.put('http://localhost/api/v1/protected/mein-account/account-aendern', body, { headers: headers, withCredentials: true }).subscribe((response) => {
          console.log(response);
          this.serverAntwort = response;
        },
          (error) => {
            console.log(error);
            this.serverAntwort = error.error.message;
          },
        );
      }
    }
    );


  }
}
