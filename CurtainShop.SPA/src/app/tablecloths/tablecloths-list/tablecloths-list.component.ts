import { Component, OnInit } from '@angular/core';
import { TableCloth } from '../../_models/tablecloth';

@Component({
  selector: 'app-tablecloths-list',
  templateUrl: './tablecloths-list.component.html',
  styleUrls: ['./tablecloths-list.component.css']
})
export class TableclothsListComponent implements OnInit {

  tablecloths: TableCloth[];

  constructor() { }

  ngOnInit(): void {
  }

}
