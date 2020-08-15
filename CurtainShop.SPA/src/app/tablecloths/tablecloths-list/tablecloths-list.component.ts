import { Component, OnInit } from '@angular/core';
import { TableCloth } from '../../_models/tablecloth';
import { TableClothService } from 'src/app/_services/tableCloth.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { NgOption } from '@ng-select/ng-select';
import { Options } from '@m0t0r/ngx-slider';

@Component({
  selector: 'app-tablecloths-list',
  templateUrl: './tablecloths-list.component.html',
  styleUrls: ['./tablecloths-list.component.css']
})
export class TableclothsListComponent implements OnInit {

  tablecloths: TableCloth[];
  tableclothsParams: any = {};
  pagination: Pagination;

  types: NgOption[] = [
    {value: 'Obrus', name: 'Obrusy'},
    {value: 'Poszewka', name: 'Poszewki'},
    {value: 'Serwetka', name: 'Serwetki'}
  ];

  minValue: number  = 0;
  maxValue: number = 1000;
  maxSize = 5;
  options: Options = {
    floor: 0 ,
    ceil: 500,
    step: 10
  };

  constructor(private tableClothService: TableClothService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.data.subscribe(data => {
       this.tablecloths = data.tablecloths.result;
       this.pagination = data.tablecloths.pagination;
     });
  }

  LoadTableCloths() {
    this.tableclothsParams.minValue = this.minValue;
    this.tableclothsParams.maxValue = this.maxValue;

    this.tableClothService.GetTableCloths(this.pagination.currentPage, this.pagination.itemsPerPage, this.tableclothsParams)
    .subscribe((res: PaginationResult<TableCloth[]>) => {
      this.tablecloths = res.result;
      this.pagination = res.pagination;
    }, error => {
      console.log(error);
    });
  }

}
