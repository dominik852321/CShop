import { Component, OnInit } from '@angular/core';
import { TableCloth } from '../../_models/tablecloth';
import { TableClothService } from 'src/app/_services/tableCloth.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-tablecloths-list',
  templateUrl: './tablecloths-list.component.html',
  styleUrls: ['./tablecloths-list.component.css']
})
export class TableclothsListComponent implements OnInit {

  tablecloths: TableCloth[];
  pagination: Pagination;

  constructor(private tableClothService: TableClothService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.data.subscribe(data => {
       this.tablecloths = data.tablecloths.result;
       this.pagination = data.tablecloths.pagination;
     });
  }

}
