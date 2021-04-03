import { PaneleService } from './panele.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panele',
  templateUrl: './panele.component.html',
  styleUrls: ['./panele.component.scss']
})
export class PaneleComponent implements OnInit {
  title = 'Firany panele | Sklep internetowy Panienka z okienka';

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
    private shopService: PaneleService,
    private titleService: Title,
    private metaTagService: Meta) {
      this.shopParams = shopService.getShopParams();
     }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: 'description',
      content:
        'Firany lub panele nowoczesne do kuchni lub do salonu, z kryształkami lub na żabki | Sklep internetowy Panienka z okienka, Firany szyte na wymiar',
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
