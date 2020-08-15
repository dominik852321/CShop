import { Component, OnInit } from '@angular/core';
import { Curtain } from 'src/app/_models/curtain';
import { CurtainService } from 'src/app/_services/curtain.service';
import { ActivatedRoute } from '@angular/router';
import { NgOption } from '@ng-select/ng-select';
import { Options } from '@m0t0r/ngx-slider';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-curtain-list',
  templateUrl: './curtain-list.component.html',
  styleUrls: ['./curtain-list.component.css']
})
export class CurtainListComponent implements OnInit {

  curtains: Curtain[];
  curtainParams: any = {};
  pagination: Pagination;

  rooms: NgOption[] = [
    {value: 'Salon', name: 'Salonowe'},
    {value: 'Kuchnia', name: 'Kuchenne'},
    {value: 'Sypialnia', name: 'Sypialniane'},
  ];
  materials: NgOption[] = [
    {value: 'Żakard' , name: 'Żakard'},
    {value: 'Organtyna' , name: 'Organtyna'},
    {value: 'Woal' , name: 'Woal'},
  ];

  minValue: number  = 0;
  maxValue: number = 1000;
  maxSize = 5;
  options: Options = {
    floor: 0 ,
    ceil: 1000,
    step: 10
  };

  constructor(private curtainService: CurtainService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.curtains = data.curtains.result;
      this.pagination = data.curtains.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.LoadCurtains();
  }

  LoadCurtains() {
    this.curtainParams.minValue = this.minValue;
    this.curtainParams.maxValue = this.maxValue;

    this.curtainService.GetCurtains(this.pagination.currentPage, this.pagination.itemsPerPage, this.curtainParams)
    .subscribe((res: PaginationResult<Curtain[]>) => {
      this.curtains = res.result;
      this.pagination = res.pagination;
    }, error => {
      console.log(error);
    });
  }

}
