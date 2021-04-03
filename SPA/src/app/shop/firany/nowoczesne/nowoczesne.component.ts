import { NowoczesneService } from './nowoczesne.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';


@Component({
  selector: 'app-nowoczesne',
  templateUrl: './nowoczesne.component.html',
  styleUrls: ['./nowoczesne.component.scss']
})
export class NowoczesneComponent implements OnInit {

  title = 'Nowoczesne firany | Sklep internetowy Panienka z okienka'

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

  constructor(private shopService: NowoczesneService, private titleService: Title, private metaTagService: Meta) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Nowoczesne firany i firanki gotowe lub na metry do salonu lub kuchni  | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
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
