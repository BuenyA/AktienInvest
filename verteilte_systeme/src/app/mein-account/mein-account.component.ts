import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mein-account',
  templateUrl: './mein-account.component.html',
  styleUrls: ['./mein-account.component.scss']
})

export class MeinAccountComponent implements OnInit {

  Accountdaten = new Array<any>();

  constructor(public dialog: MatDialog, public http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/mein-account').subscribe(data => {
      this.Accountdaten = data;
    })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ' + result)
    });
    }
}
