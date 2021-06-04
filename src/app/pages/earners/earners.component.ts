import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-earners',
  templateUrl: './earners.component.html',
  styleUrls: ['./earners.component.scss']
})
export class EarnersComponent implements OnInit, AfterViewInit {

  constructor() { }
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['name', 'type', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



}

export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'JAVA Candidate', type: 'Recruitment', status: 'Active'},
  {position: 2, name: 'JAVA Candidate', type: 'Events', status: 'Disabled'},
];