import { Component, OnInit, Input } from '@angular/core';
import { TableCloth } from 'src/app/_models/tablecloth';

@Component({
  selector: 'app-tablecloths-card',
  templateUrl: './tablecloths-card.component.html',
  styleUrls: ['./tablecloths-card.component.css']
})
export class TableclothsCardComponent implements OnInit {


  @Input() tablecloth: TableCloth;

  constructor() { }

  ngOnInit(): void {
  }

}
