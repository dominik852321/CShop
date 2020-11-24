import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { IRoom } from '../shared/models/productRoom';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[];
  types: IType[];
  rooms: IRoom[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
   {name: 'Alfabetycznie', value: 'name'},
   {name: 'Od najtańszego', value: 'priceAsc'},
   {name: 'Od najdroższego', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
      this.getProducts(true);
      this.getTypes();
      this.getRooms();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
       console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'Wszystko'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getRooms() {
    this.shopService.getRooms().subscribe(response => {
      this.rooms = [{id: 0, name: 'Wszystko'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onRoomSelected(roomId: number) {
    const params = this.shopService.getShopParams();
    params.roomId = roomId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
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

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    this.getProducts();
  }

}
