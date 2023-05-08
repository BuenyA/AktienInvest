import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MultiplayerAccountDataService } from '../services/multiplayer-services/multiplayer-account-data.service';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Component({
    selector: 'app-highscore-list',
    templateUrl: './highscore-list.component.html',
    styleUrls: ['./highscore-list.component.scss']
})

export class HighscoreListComponent implements AfterViewInit, OnInit {

    Accountdaten = new Array<any>();

    displayedColumns: string[] = ['name', 'gewinn'];
    dataSource = new MatTableDataSource;

    multiplayerMode: boolean;

    constructor(private multiplayer: MultiplayerAccountDataService, public http: HttpClient) { }

    @ViewChild(MatPaginator) paginator: any = MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;

        this.http.get<any[]>('http://localhost/api/v1/protected/highscore-data', { withCredentials: true })
  .pipe(
    map(data => data.sort((a, b) => b.KONTOSTAND - a.KONTOSTAND)) // Sort Data descending by KONTOSTAND
  )
  .subscribe(data => {
    this.dataSource.data = data;
    console.log("ausgabe= " + this.dataSource.data);
  });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}