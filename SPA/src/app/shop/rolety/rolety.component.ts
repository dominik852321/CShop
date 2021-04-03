import { RoletyService } from './rolety.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rolety',
  templateUrl: './rolety.component.html',
  styleUrls: ['./rolety.component.scss']
})
export class RoletyComponent implements OnInit {

  title = 'Rolety rzymskie | Sklep internetowy Panienka z okienka';

  products: IProduct[];
  totalCount: number;
  shopParams: ShopParams;
  sortOptions = [
    { name: 'Najnowszę', value: 'addDesc' },
    { name: 'Najstarsze', value: 'addAsc' },
    { name: 'Najtańsze', value: 'priceAsc' },
    { name: 'Najdroższe', value: 'priceDesc' },
  ];
  isCollapsed = true;

  constructor(
    private shopService: RoletyService,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: 'description',
      content:
        'Rolety rzymskie i panele firanowa na karnisz, gotowe lub szyte na miare, modne i nowoczesne | Sklep internetowy Panienka z okienka, Firany szyte na wymiar',
    });
    this.getProducts(true);
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }
}
