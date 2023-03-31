import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrls: ['./highscore-list.component.scss']
})

export class HighscoreListComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'gewinn'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}
}
export interface PeriodicElement {
  name: string;
  position: number;
  gewinn: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', gewinn: 1.0079 },
  {position: 2, name: 'Helium', gewinn: 4.0026 },
  {position: 3, name: 'Lithium', gewinn: 6.941},
  {position: 4, name: 'Beryllium', gewinn: 9.0122},
  {position: 5, name: 'Boron', gewinn: 10.811},
  {position: 6, name: 'Carbon', gewinn: 12.0107},
  {position: 7, name: 'Nitrogen', gewinn: 14.0067},
  {position: 8, name: 'Oxygen', gewinn: 15.9994},
  {position: 9, name: 'Fluorine', gewinn: 18.9984},
  {position: 10, name: 'Neon', gewinn: 20.1797},
  {position: 11, name: 'Sodium', gewinn: 22.9897}

];


