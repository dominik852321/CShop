import { GotoweService } from './gotowe.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';

@Component({
  selector: 'app-gotowe',
  templateUrl: './gotowe.component.html',
  styleUrls: ['./gotowe.component.scss']
})
export class GotoweComponent implements OnInit {

  title = 'Firanki gotowe lub na metry | Sklep internetowy Panienka z okienka'

  products: IProduct[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
   {name: 'Najnowszę', value: 'addDesc'},
   {name: 'Najstarsze', value: 'addAsc'},
   {name: 'Najtańsze', value: 'priceAsc'},
   {name: 'Najdroższe', value: 'priceDesc'}
  ];
  isCollapsed = true;

  constructor(private shopService: GotoweService, private titleService: Title, private metaTagService: Meta) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Firany i firanki gotowe lub na metry, modne i nowoczesne do salonu lub kuchni | Sklep internetowy Panienka z okienka, Firany na wymiar'})
    this.getProducts(true);

}

getProducts(useCache = false) {
  this.shopService.getProducts(useCache).subscribe(response => {
    this.products = response.data;
    this.totalCount = response.count;
  }, error => {
     console.log(error);
  });
}




onSortSelected(sort: string) {
  const params = this.shopService.getShopParams();
  params.sort = sort;
  this.shopService.setShopParams(params);
  this.getProducts();
}

onPageChanged(event: any) {
  const params = this.shopService.getShopParams();
  if (params.pageNumber !== event){
  params.pageNumber = event;
  this.shopService.setShopParams(params);
  this.getProducts(true);
 }
}

}
